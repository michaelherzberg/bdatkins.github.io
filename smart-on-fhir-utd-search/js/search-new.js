// Call to initialize UTD, passing in any custom settings
$.utd.init({
	contextPath: '',
	topicType: '',
	topicClass: '',
	topicKey: '',
	topicLanguage : '',
	pageType: 'SEARCH',
	imageKey: '',
	imageTitle: '',
	searchTerm: '',
	isPrintView: false,
	isSearchResults: false,
	tabId: 'searchTab',
	onReadyUrl: 'http://s5www.utdlab.com/services/AutoComplete',
	showSurvey:
	false,
	locale: 'en',
	 removeTxt: 'Remove',
	exportPowerpoint: true
	 ,
	 userEngagement:
		true,
	acceptUrl: 'http://s5www.utdlab.com/services/AgreementWebService?type=accept',
	declineUrl: 'http://s5www.utdlab.com/home/contact-us',
	licenseUrl: 'http://s5www.utdlab.com/contents/license',
	marketoUrl: 'http://s5www.utdlab.com/compliance/info',
	cancelComplianceUrl: 'http://s5www.utdlab.com/compliance/info?method=cancelled',
	pwUrl: 'http://s5www.utdlab.com/account/contact?method=cancel',
	autoCompleteLength: '{"latinLength":1,"nonLatinLength":1}',
	providerTranslationURL: '',
	translation: '',
	detectedLang: 'en',
	uiClickEventUrls: 'http://www.provationordersets.com/,/home/help-demo$,^/contents/practice-changing-updates,^http://www.linkedin.com/company/uptodate,/home/help$,/home/training-resource-center,http://www.wolterskluwerhealth.com/,/home/contact-us,/contents/drug-interaction,http://learn.uptodate.com/global,http://www.medispan.com/,^/contents/table-of-contents/([^/]+)$,^/account/index,http://pharmacyonesource.com/,http://www.lexi.com/,https://twitter.com/UpToDate,/home/uptodate-mobile-access,/contents/license,http://www.provationmedical.com/,^/account/cme/process,https://www.facebook.com/UpToDateEBM,http://www.medicom.com.cn/,http://www.healthlanguage.com/,http://www.youtube.com/uptodateebm,http://www.factsandcomparisons.com/,/home/policies',
	searchResultsState: 'EXPANDED',
	searchResultsOutline: true
	,
	appType: 'BROWSER_DEFAULT',
	charRemainingMessage: 'characters remaining',
	pleaseWaitMessage: 'Please wait',
	isTrack: false,
	lastTopicViewedDatabaseId: "-1",
	mobileToken: "",
	isFromMobileApp: false
});
var fhirServiceUrl = "https://fhir-dstu2.smarthealthit.org";
//var fhirServiceUrl = "https://fhir-open-api.smarthealthit.org";
//var fhirServiceUrl = "http://utd02808.utd.com:9080";
//var fhirServiceUrl = "http://utd02808.utd.com:1337";

var objSmart;
var patientID = "";
var gender = "Unknown";
var numPatients = 0;

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
	$('#patientInfo').css('height', 'auto');
	$('#exp').attr('src','images/chevron-expand.png');
  }
  return result[0];
}

function fetchApp(appId) {
	appId = "utd_search";
	var deferred = $.Deferred();

	$.get(
		"json/apps.json",
		function(apps){
			apps = apps.filter(function(app) {
				return app.client_id == appId;
			});
			deferred.resolve(apps[0]);
		},
		"json"
	 ).fail(function() {
		$("#patientInfo").append("<br /><br /><b style='color:red'>Unable to obtain app info</b>");
	  });

	return deferred.promise();
}

function fetchPatientName(patientID) {
	var deferred = $.Deferred();

	if (patientID != "") {
		$.get(
			fhirServiceUrl + "/Patient/" + patientID,
			function(pt){
				deferred.resolve(pt.name[0].given[0] +" "+ pt.name[0].family[0]);
			},
			"json"
	 ).fail(function() {
			$("#patientInfo").append("<br /><br /><div><div><b style='color:red'>ERROR: Unable to load patient data.</div><br /><br /><div>Host:<br> "+ fhirServiceUrl + "</div><br /><br /><div>Patient ID: " + patientID + "</b></div</div>");
	  });
	}

	return deferred.promise();
}

 function fetchPatientBirthday(patientID) {
	var deferred = $.Deferred();

	$.get(
		fhirServiceUrl + "/Patient/" + patientID,
		function(pt){
			deferred.resolve(pt.birthDate);
		},
		"json"
	 ).fail(function() {
		$("#patientInfo").append("<br /><br /><b style='color:red'>No Patient Birthday</b>");
	  });

	return deferred.promise();
}

function fetchPatientGender(patientID) {
	var deferred = $.Deferred();

	$.get(
		fhirServiceUrl + "/Patient/" + patientID,
		function(pt){
			deferred.resolve(pt.gender.coding[0].code[0] + " - " + pt.gender.coding[0].display);
		},
		"json"
	 ).fail(function() {
		$("#patientInfo").append("<br /><br /><b style='color:red'>No Patient Gender</b>");
	  });

	return deferred.promise();
}

function fetchPatients (patientIDs) {
	var myDeferred = $.Deferred();

	var deferred = $.Deferred();
	deferred.resolve();
	var res = [];

	$.each (patientIDs, function (id, patientId) {
		deferred = deferred.then(function() {
			return $.when(fetchPatientName(patientId))
			 .then(function(name) {
				var patient = {name: name, id: patientId};
			  res.push(patient);
			 });
		});
	});

	deferred.done(function() {
		res.sort(function (a,b) {
			if (a.name > b.name) {
				return 1;
			} else if (a.name < b.name) {
				return -1;
			} else {
				return 0;
			}
		});
		myDeferred.resolve(res);
	});

	return myDeferred.promise();
}

function launchApp (appTitle, launchUrl, fhirServiceUrl, patientId) {
	var url = launchUrl + "?patientId=" + patientId;
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

function initSelector(patients, launchApp) {
	$.each(patients, function(id, patient) {
		$("#patient-list").append("<option value='" + patient.id + "'>" + patient.name + "</option>");
	});

	function onChange () {
		patientID = $("#patient-list").val();
		$('#pediAge').html("");
		$('#adultAge').html("");

		var demo = {
			serviceUrl: fhirServiceUrl,
			patientId: patientID
		};

		// Create a FHIR client (server URL, patient id in demo)
		var smart = FHIR.client(demo),
		pt = smart.patient;
		console.log("New Patient Context: " + pt.id);

		// Create a patient banner by fetching + rendering demographics
		var gender = "";
		pt.read()
			.then(function (p) {
				// identify patient gender
				try {
					gender = p.gender.coding[0].display;
					console.log("Gender Identified: " + gender);
				} catch (err) {
					console.log("Not DSTU1 Gender: " + err);
					try {
						gender = p.gender;
						console.log("Gender Identified: " + gender);
					} catch (err) {
						console.log("Not DSTU2 Gender: " + err);
					}
				}

				// make friendly age
				var bday = p.birthDate;
				var age = getAge(p.birthDate);
				if (age < 18) {
					var numMos = monthDiff(new Date(), bday);
					//console.log(numMos);
					$('input:radio[name="sp"][value="2"]').prop('checked', true);
					if (numMos < 24) {
						$('#pediAge').html("("+weekDiff(new Date(), bday)+" wks)");
					} else if (age < 4) {
						$('#pediAge').html("("+monthDiff(new Date(), bday)+" mos)");
					} else {
						$('#pediAge').html("("+age+" y.o.)");
					}
				} else if (age > 17 && age < 122) {
					$('input:radio[name="sp"][value="1"]').prop('checked', true);
					$('#adultAge').html("("+age+" y.o.)");
				} else {
					$('input:radio[name="sp"][value="0"]').prop('checked', true);
				}
				var friendlyAge = $('#adultAge').html().replace('(', '').replace(')', '')+$('#pediAge').html().replace('(', '').replace(')', '');

				$("#patientInfo").html("<b>Patient Info</b><br /><div id='patInfo'><div class='labl'>Name:</div><div>"  + p.name[0].given + " " +  p.name[0].family + "</div><br />" + "<div class='labl'>Sex:</div><div>" + p.gender.coding[0].display + "</div><br />" + "<div class='labl'>Born:</div> <div>" + p.birthDate + "</div><br />" + "<div class='labl'>Age:</div> <div id='ageInfo'>" + getAge(p.birthDate) + "</div><br />" + "<div class='labl'>Active:</div> <div>" + p.active + "</div></div>");
		 });

		launchApp(patientID);
	}

	$("#patient-list").change(onChange);
	$("#patient-list").show();

	numPatients = $("#patient-list option").length;

	if (numPatients > 1) {
		$("#showMulti").show();
	}

	onChange();
}

function loadPatient(patientID) {
	if (objSmart != null) {
		var pt = objSmart.patient;
		//var userID = objSmart.openid;
		//console.log(JSON.stringify(objSmart));
		//console.log(objSmart.profile);

		pt.read()
			.then(function (p) {
				var name = p.name[0];

				// identify patient gender
				try {
					gender = p.gender.coding[0].display;
					console.log("Gender Identified: " + gender);
				} catch (err) {
					console.log("Not DSTU1 Gender: " + err);
					try {
						gender = p.gender;
						console.log("Gender Identified: " + gender);
					} catch (err) {
						console.log("Not DSTU2 Gender: " + err);
					}
				}

				// make friendly age
				var bday = p.birthDate;
				var age = getAge(p.birthDate);
				if (age < 18) {
					var numMos = monthDiff(new Date(), bday);
					//console.log(numMos);
					$('input:radio[name="sp"][value="2"]').prop('checked', true);
					if (numMos < 24) {
						$('#pediAge').html("("+weekDiff(new Date(), bday)+" wks)");
					} else if (age < 4) {
						$('#pediAge').html("("+monthDiff(new Date(), bday)+" mos)");
					} else {
						$('#pediAge').html("("+age+" y.o.)");
					}
				} else if (age > 17 && age < 122) {
					$('input:radio[name="sp"][value="1"]').prop('checked', true);
					$('#adultAge').html("("+age+" y.o.)");
				} else {
					$('input:radio[name="sp"][value="0"]').prop('checked', true);
				}
				var friendlyAge = $('#adultAge').html().replace('(', '').replace(')', '')+$('#pediAge').html().replace('(', '').replace(')', '');

				// display patient data
				$("#patientInfo").html("<b>Patient Info</b><br /><div id='patInfo'><div class='labl'>Name:</div><div>"  + p.name[0].given + " " +  p.name[0].family + "</div><br />" + "<div class='labl'>Sex:</div><div>" + gender + "</div><br />" + "<div class='labl'>Born:</div> <div>" + p.birthDate + "</div><br />" + "<div class='labl'>Age:</div> <div id='ageInfo'>" + friendlyAge + "</div><br /></div>");
				$('#patientInfo').css('height', 'auto');
				$('#exp').attr('src','images/chevron-expand.png');

				var formatted = name.given.join(" ") + " " + name.family;
		});
	}
}

var appID = urlParam("app");

$(window).load(function(){
	var patientIDs = new Array();

	patientID = $("#patient-list").val();
	$('#pediAge').html("");
	$('#adultAge').html("");

	try {
		if (urlParam("patients") != null) {
			patientIDs = urlParam("patients").split(",");
			console.log("QS Patient ID: " + patientIDs);

			fhirServiceUrl = "http://utd02808.utd.com:9080";

			$.when(fetchApp(appID),fetchPatients(patientIDs))
			 .then(function(app, patients) {
				initSelector(patients, function (patientId) {
					launchApp(
						app.client_name,
						app.launch_uri,
						fhirServiceUrl,
						patientId+".json"
					);
				});
			 });
		} else {
			FHIR.oauth2.ready(function(smart){
				objSmart = smart;
				patientIDs.push(smart.patient.id);
				console.log("OAuth Patient ID: " + patientIDs);
				loadPatient(patientIDs[0]);
			});
		}
	} catch (err) {
		console.log("Unable to obtain Patient ID: " + err);
	}
});