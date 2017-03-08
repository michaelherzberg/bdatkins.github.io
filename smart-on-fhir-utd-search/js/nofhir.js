	function urlParam(p) {
		var query = location.search.substr(1);
		var data = query.split("&");
		var result = [];

		for(var i=0; i<data.length; i++) {
		var item = data[i].split("=");
		if (item[0] === p) {
		  result.push(decodeURIComponent(item[1]));
		}
	}

	if (result.length === 0){
		$("#patientInfo").html("<b>No Patient Info</b>");
		$('#patientInfo').css('height', '38px');
		$('#exp').attr('src', 'images/chevron.png');
		return null;
	} else {
		$('#patientInfo').css('height', '160px');
		$('#exp').attr('src','images/chevron-expand.png');
		}
		return result[0];
	}

	function isLeapYear(year) {
		var d = new Date(year, 1, 28);
		d.setDate(d.getDate() + 1);
		return d.getMonth() == 1;
	}

	function getAge(date) {
		var d = new Date(date), now = new Date();
		var years = now.getFullYear() - d.getFullYear();
		d.setFullYear(d.getFullYear() + years);
		if (d > now) {
			years--;
			d.setFullYear(d.getFullYear() - 1);
		}
		var days = (now.getTime() - d.getTime()) / (3600 * 24 * 1000);
		var age =  years + days / (isLeapYear(now.getFullYear()) ? 366 : 365);
		return Math.floor(age);
	}

	function weekDiff(da1, da2) {
		var d1 = new Date(da1);
		var d2 = new Date(da2);
		// The number of milliseconds in one week
		var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;
		// Convert both dates to milliseconds
		var d1_ms = d1.getTime();
		var d2_ms = d2.getTime();
		// Calculate the difference in milliseconds
		var difference_ms = Math.abs(d1_ms - d2_ms);
		// Convert back to weeks and return hole weeks
		return Math.floor(difference_ms / ONE_WEEK);
	}

	function monthDiff(d2, d1) {
		var months;
		var da1 = new Date(d1);
		var da2 = new Date(d2);
		months = (da2.getFullYear() - da1.getFullYear()) * 12;
		months -= da1.getMonth() + 1;
		months += da2.getMonth() + 1;
		return months <= 0 ? 0 : months;
	}
	function getMos(date) {
		var d = new Date(date), now = new Date();
		return monthDiff(d, now);
	}

	function genAge(bday) {
		var age = getAge(bday);

		console.log("Patient Age: " + age);
		if (age < 18) {
			var numMos = monthDiff(new Date(), bday);
			console.log(numMos);
			$('input:radio[name="sp"][value="2"]').prop('checked', true);
			if (numMos < 24) {
				$('#pediAge').html("("+weekDiff(new Date(), bday)+" wks)");
			} else if (age < 4) {
				$('#pediAge').html("("+monthDiff(new Date(), bday)+" mos)");
			} else {
				$('#pediAge').html("("+age+" y.o.)");
			}
		} else if (age > 17 && age < 120) {
			$('input:radio[name="sp"][value="1"]').prop('checked', true);
				$('#adultAge').html("("+age+" y.o.)");
		} else {
			$('input:radio[name="sp"][value="0"]').prop('checked', true);
		}

		$('#ageInfo').html($('#adultAge').html().replace('(', '').replace(')', '')+$('#pediAge').html().replace('(', '').replace(')', ''));
	}

	$(window).load(function(){
		var patientIDs = new Array();

		patientID = $("#patient-list").val();
		$('#pediAge').html("");
		$('#adultAge').html("");

		try {
			if (urlParam("patient") != null) {
				patientID = urlParam("patient").split(",");
				console.log("QS Patient ID: " + patientID);

				// get json from node service
				var serviceUrl = "http://utd02808.utd.com:1337/Patient/"+patientID;
				$.getJSON(serviceUrl, function( data ) {
					console.log(data);

					// process handlebars
					var source   = $("#patientTemplate").html();
					var template = Handlebars.compile(source);
					var html    = template(data);
					$('#patientInfo').append(html);

					// define age
					genAge($("#bornInfo").html());
				});
			}
		} catch (err) {
			console.log("Unable to obtain Patient ID: " + err);
		}
	});