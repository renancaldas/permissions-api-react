'use strict';

/* NPM Dependencies
---------------------------------*/
const express = require('express');
const app = express();
const config = require('config').get('config');
const bodyParser  = require( 'body-parser' );
const debug = require("debug")("permissionsApiRenan:lib:http.js");

/* Local Dependencies
---------------------------------*/
const Responses = require('./responses.js');

// Parse body in json format
app.use( bodyParser.json() );

// CORS
app.use(function (req, res, next) {

    // Websites you wish to allow to connect
    var allowedOrigins = config.allowedOrigins;
    var enabledAll = allowedOrigins.indexOf('*') > -1;
    if(enabledAll || allowedOrigins.indexOf(req.headers.origin) > -1) {
      res.setHeader('Access-Control-Allow-Origin', (enabledAll ? '*' : req.headers.origin));
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
      res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
      res.setHeader('Access-Control-Allow-Credentials', true);
    }

    // Pass to next layer of middleware
    next();
});

// Routes
app.use('/api/v1/', require('./api_v1'));


// Starting the server
var server = app.listen(config.port, function () {
  debug('App listening on port %s', config.port);
  debug('Press Ctrl+C to quit.');
});

module.exports = server;
