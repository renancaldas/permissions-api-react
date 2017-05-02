'use strict';

/* NPM Dependencies
---------------------------------*/
const mongoose = require('mongoose');
const config = require('config').get('config');
const debug = require('debug')("permissionsApiRenan:server.js");

/* Database
---------------------------------------------*/
mongoose.Promise = require('q').Promise;
mongoose.connect(config.mongoUrl, function(err, res) {
  if(err) {
    debug('ERROR: connecting to Database. ' + err);
  }
  else {
    debug('Connected do db: ' + config.mongoUrl);
  }
});

// Starting libs
var http = require('./lib/http.js');
