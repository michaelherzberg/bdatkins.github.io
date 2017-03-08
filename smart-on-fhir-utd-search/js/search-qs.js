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
	onReadyUrl: '/services/AutoComplete',
	showSurvey: 
	false,
	locale: 'en',
	 removeTxt: 'Remove',
	exportPowerpoint: true
	 ,
	 userEngagement: 
		true,			 	
	acceptUrl: '/services/AgreementWebService?type=accept',
	declineUrl: '/home/contact-us',
	licenseUrl: '/contents/license',
	marketoUrl: '/compliance/info',
	cancelComplianceUrl: '/compliance/info?method=cancelled',
	pwUrl: '/account/contact?method=cancel',
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

var fhirServiceUrl = "https://fhir-open-api.smarthealthit.org";
var patientID = "";
var currGender = "";
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
	$('#patientInfo').css('height', '180px'); 
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
		$("#patientInfo").append("<br /><br /><b style='color:red'>ERROR: Unable to load patient data.<br /><br />Host: "+ fhirServiceUrl + "<br /><br />Patient ID: " + patientID + "</b>");
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

function monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth() + 1;
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

function getMos(date) {
	var d = new Date(date), now = new Date();
	return monthDiff(d, now);
}

function initSelector (patients, launchApp) {		
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
			pt = smart.context.patient;

			
		// Create a patient banner by fetching + rendering demographics
		pt.read()
			.then(function (p) {
				$("#patientInfo").html("<b>Patient Info</b><br /><br /><div class='labl'>Name:</div><div>"  + p.name[0].given + " " +  p.name[0].family + "</div><br />" + "<div class='labl'>Sex:</div><div>" + p.gender.coding[0].display + "</div><br />" + "<div class='labl'>Born:</div> <div>" + p.birthDate + "</div><br />" + "<div class='labl'>Age:</div> <div>" + getAge(p.birthDate) + "</div><br />" + "<div class='labl'>Active:</div> <div>" + p.active + "</div>");
		});
	
		$.when(fetchPatientBirthday(patientID))
		 .then(function(bday) {
			var age = getAge(bday);
			
			console.log("Patient Age: " + age);
			if (age <= 17 && age > 0) {
				$('input:radio[name="sp"][value="2"]').prop('checked', true);
				
				if (age < 3) {
					$('#pediAge').html("("+getMos(bday)+" mos)");		
				} else {
					$('#pediAge').html("("+age+" y.o.)");				
				}
			} else if (age > 17 && age < 120) {
				$('input:radio[name="sp"][value="1"]').prop('checked', true);
					$('#adultAge').html("("+age+" y.o.)");	
			} else {
				$('input:radio[name="sp"][value="0"]').prop('checked', true);
			}
		 });
		 
		 $.when(fetchPatientGender(patientID))
		 .then(function(gender) {
			console.log("Gender: " + gender);
			currGender = gender;
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

var appID = urlParam("app");
try {
	var patientIDs = urlParam("patients").split(",");
	
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
 } catch (err) {}
 
$(window).load(function(){
	var demo = {
		serviceUrl: fhirServiceUrl,		
		patientId: patientID
	};
	
	// Create a FHIR client (server URL, patient id in demo)	
	if (patientID != "") {	
	
		var smart = FHIR.client(demo),
			pt = smart.context.patient;

		// Create a patient banner by fetching + rendering demographics
		pt.read()
			.then(function (p) {
			var name = p.name[0];
									
			console.log(p.gender.coding[0].code[0]);				
			console.log(p.gender.coding[0].display);	
			console.log(p.birthDate);
			console.log(getAge(p.birthDate));

			var age = getAge(p.birthDate);
			console.log("Patient Age: " + age);			
			if (age <= 17 && age > 0) {
				$('input:radio[name="sp"][value="2"]').prop('checked', true);
				
				if (age < 3) {
					$('#pediAge').html("("+getMos(bday)+" mos)");		
				} else {
					$('#pediAge').html("("+age+" y.o.)");				
				}
			} else if (age > 17 && age < 120) {
				$('input:radio[name="sp"][value="1"]').prop('checked', true);
					$('#adultAge').html("("+age+" y.o.)");	
			} else {
				$('input:radio[name="sp"][value="0"]').prop('checked', true);
			}
			
			var formatted = name.given.join(" ") + " " + name.family;
			//$("#patient_name").text(formatted);
		});
	}
});