'use strict';

/* NPM Dependencies
---------------------------------*/
const debug = require('debug')("permissionsApiRenan:permissions.js");
const mongoose = require('mongoose');
const request = require('request');
const Q = require('q');

/* Model Schema
---------------------------------*/
var permissionsSchema = new mongoose.Schema({
	code: {type: String, required: true}
}, {collection: 'permissions'});

var Permissions = mongoose.model('permissions', permissionsSchema);

module.exports = {
	model: Permissions,
	getList: function () {
			var deferred = Q.defer();

			try {
				Permissions.find({}).then(function (permissions) {
					deferred.resolve(permissions);
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
