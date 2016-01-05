// server.js

// set up ======================================================================
// get all the tools we need
var express      = require('express');
var port         = process.env.PORT || 2991;
var mongoose     = require('mongoose');
var passport     = require('passport');
var flash        = require('connect-flash');
var app          = module.exports = express();
var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');
var configDB     = require('./config/database.js');
var path         = require('path');
// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database
require('./config/passport')(passport); // pass passport for configuration

app.use(express.static('public/'));
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use('/app', express.static(__dirname + '/app'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
app.use('/public/angular/components', express.static(__dirname + '/public/angular/components'));
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());

app.use(passport.session()); // persistent login sessions

// routes ======================================================================

//require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
require('./app/api/auth.js')(app, passport);
require('./app/api/index.js')(app, __dirname);

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);