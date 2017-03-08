var request = require('request');
var path = require('path');
var express = require('express'),
    app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(cookieParser());
app.use(session({secret: '1234567890QWERTY', resave: false, saveUninitialized: true}));
app.use(express.static(path.join(__dirname, 'public')));

var fhirServiceUrl = 'http://localhost:9080/Patient/';
var nodeUrl = "http://localhost";
var patient = 7777707;

// Set the client credentials and the OAuth2 server
var credentials = {
  clientID: "ccad2582-887c-4652-8927-23ab3faf075b",
  clientSecret: 'WQsoUh0nHlde9uTTP3ET-5EqyfeP35Xxv5ln1e7KMJDBBQDOFQohN60W4ojso--vPP0ggEp0fThO-bYM0KLW',
  site: nodeUrl+':9085'
};

// Initialize the OAuth2 Library
var oauth2 = require('simple-oauth2')(credentials);

// Initial call redirecting to the Auth Server
app.get('/auth', function (req, res) {
	console.log('/auth\n');
	//oauth2.authCode.getToken();

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

  if (req.query.patient != undefined)
		patient = req.query.patient;

	// Authorization oauth2 URI
	var authorization_uri = oauth2.authCode.authorizeURL({
	  redirect_uri: nodeUrl+':1339/callback?patient='+patient,
	  scope: 'openid'
	});

	// Redirect example using Express (see http://expressjs.com/api.html#res.redirect)
	res.redirect(authorization_uri);
});

// get token after code retrieval
app.get('/callback', function (req, res) {
  console.log('/callback\n');

  var code = req.query.code;
  if (req.query.patient != undefined)
		patient = req.query.patient;

  console.log("Code: " + code);
    //var state = req.query.state;
    //console.log(state);

  oauth2.authCode.getToken({
    code: code,
    redirect_uri: nodeUrl+':1339/callback?patient='+patient
  }, saveToken);

  function saveToken(error, result) {
	//console.log(result);
    if (error) {
		console.log('Access Token Error', error);
    	res.end(JSON.stringify(error));
    } else {
		token = oauth2.accessToken.create(result);
		console.log(result.access_token);
		//res.redirect(nodeUrl+'/prototype1/emr-data-api.html?code='+code+'&token='+result.access_token);

		if (req.query.patient != undefined)
			patient = req.query.patient;
		var rest_url = fhirServiceUrl+patient;
		console.log(rest_url);

		request({url:rest_url, json:true}, function (error, response, body) {
			res.end(JSON.stringify(body));
			console.log(JSON.stringify(body));
		});
	}
  }

});

// provide link
app.get('/', function (req, res) {
console.log('/\n');
  res.send('<a href="/auth">LOGIN</a>');
});

app.listen(1339);

console.log("OAuth Client with Proxy Access started on port 1339");