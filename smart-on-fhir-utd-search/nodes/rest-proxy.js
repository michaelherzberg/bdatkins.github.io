var url = require('url');
var request = require('request');
var http = require('http');

var fhirServiceUrl = 'http://localhost:9080/Patient/';
var showJSON = true;  // false = XML

// Set the client credentials and the OAuth2 server
var credentials = {
  clientID: "ccad2582-887c-4652-8927-23ab3faf075b",
  clientSecret: 'WQsoUh0nHlde9uTTP3ET-5EqyfeP35Xxv5ln1e7KMJDBBQDOFQohN60W4ojso--vPP0ggEp0fThO-bYM0KLW',
  site: 'http://localhost:9085'
};

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')(credentials);

http.createServer(function (req, res) {
    // Allow CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

	if (req.url === '/favicon.ico') {
		res.writeHead(200, {'Content-Type': 'image/x-icon'} );
		res.end();
		//console.log('favicon requested');
		return;
	}

	var patient = '';
	var path = require('url').parse(req.url,true).pathname;
	console.log("Node client requested on: " + path);

	if (path === '/' || path === '/Patient') {
		var query = require('url').parse(req.url,true).query;
		patient = query.patient;
		console.log('Using QS patient: ' + patient);
	} else {
		patient = path.split('/')[1];
		if (patient == 'Patient') {
			patient = path.split('/')[2];
		}
		console.log('Using REST endpoint patient: ' + patient);
	}

	if (showJSON) {
		res.writeHead(200, {'Content-Type': 'application/json'});
	} else {
		res.writeHead(200, {'Content-Type': 'application/xml'});
	}

	//res.end(patient);
	var rest_url = fhirServiceUrl+patient;

	console.log(rest_url);
	//console.log(require('url').parse(req.url,true).pathname);

	if (showJSON) {
		request({url:rest_url, json:true}, function (error, response, body) {
			res.end(JSON.stringify(body));
			console.log(JSON.stringify(body));
		});
	} else {
		request({url:rest_url}, function (error, response, body) {
			res.end(body);
		});
	}
}).listen(1337);

console.log("REST Proxy Client started on port 1337");