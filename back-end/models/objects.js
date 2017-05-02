'use strict';

/* NPM Dependencies
---------------------------------*/
const debug = require('debug')("permissionsApiRenan:objects.js");
const mongoose = require('mongoose');
const request = require('request');
const Q = require('q');

/* Model Schema
---------------------------------*/
var objectsSchema = new mongoose.Schema({
	name: {type: String, required: true}
}, {collection: 'objects'});

var Objects = mongoose.model('objects', objectsSchema);

module.exports = {
	model: Objects,
	getList: function () {
			var deferred = Q.defer();

			try {
				Objects.find({}).then(function (objects) {
					deferred.resolve(objects);
				}, function (err) {
					deferred.reject(err);
				})
			}
			catch(ex) {
				deferred.reject(ex);
			}

			return deferred.promise;
	}
}
