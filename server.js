if (process.env.hasOwnProperty("TTA_FIREBASE_URL")) {
	FirebaseRootUrl = process.env.TTA_FIREBASE_URL;
} else {
	//console.log("Firebase Token Not Configured in Environment. Terminating process.");
	process.exit(1);
}
if (process.env.hasOwnProperty("TTA_FIREBASE_TOKEN")) {
	FirebaseToken = process.env.TTA_FIREBASE_TOKEN;
} else {
	//console.log("Firebase Token Not Configured in Environment. Terminating process.");
	process.exit(1);
}


/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path')
  , request = require('request')
  , swig  = require('swig')
  , compression = require('compression')
  , bodyParser = require('body-parser');

var prodEnv = (process.env.OB_ENV === 'production');

var app = express();

// This is where all the magic happens!
app.engine('html', swig.renderFile);

// all environments

app.set('port', process.env.PORT || 3000);

//app.set('views', __dirname + '/build');
app.set('view engine', 'html');

// Swig will cache templates for you, but you can disable
// that and use Express's caching instead, if you like:
app.set('view cache', true);
// To disable Swig's cache, do the following:
	//swig.setDefaults({ cache: true });
// NOTE: You should always cache templates in a production environment.
// Don't leave both of these to `false` in production!
app.use(compression()); 
app.use(bodyParser());
/*
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
//app.use(express.session());
*/

//app.use(app.router);
//app.use(require('less-middleware')({ src: __dirname + '/public' }));

// Publish `compiled` Folder as Static Directory
app.use(express.static('app'));
//app.use(express.static(path.join(__dirname, 'app')));

app.get('/index.html', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");

	var obj = {
		firebaseURL: FirebaseRootUrl,
		firebaseToken: FirebaseToken,
	};

	res.render('index', { appSettings: JSON.stringify(obj) });
});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
