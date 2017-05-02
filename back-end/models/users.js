'use strict';

/* NPM Dependencies
---------------------------------*/
const debug = require('debug')("permissionsApiRenan:users.js");
const mongoose = require('mongoose');
const request = require('request');
const Q = require('q');
const _ = require('lodash');

/* Model Schema
---------------------------------*/
var userPermissionsSchema = new mongoose.Schema({
	permissionCode: {type: String, required: true},
	object: {type: mongoose.Schema.ObjectId, ref: "objects"},
});

var usersSchema = new mongoose.Schema({
	name: {type: String, required: true},
	permissions: [ userPermissionsSchema ]
}, {collection: 'users'});

/* Model Dependencies
---------------------------------*/
var Users = mongoose.model('users', usersSchema);
var Permissions = require('./permissions.js').model;
var Objects = require('./objects.js').model;

module.exports = {
	model: Users,
	addPermission: function (userId, permissionCode, objectId) {
		var deferred = Q.defer();

		try {
			var promises = [
				Users.findOne({_id: userId}),
				Permissions.findOne({code: { $regex: new RegExp("^" + permissionCode, "i") }}), // Case insensitive
				Objects.findOne({_id: objectId}),
			];

			Q.allSettled(promises).then(function (results) {
				//var rejects = _.filter(results, {state: 'rejected'});
				var user = results[0].value;
				var permission = results[1].value;
				var object = results[2].value;

				if(!user) {
						deferred.reject('User with id ' + userId + ' not found!')
				}
				else if(!permission) {
						deferred.reject('Permission with code ' + permissionCode + ' not found!')
				}
				else if(!object) {
						deferred.reject('Object with id ' + objectId + ' not found!')
				}
				else {
					// Check if user already has permission to a specific object
					var hasPermissionInUser = _.find(user.permissions, function(p) {
						return (p.permissionCode.toLowerCase() === permission.code.toLowerCase() && p.object.toString() === objectId);
					});
					// It doesn't have, add new permission
					if(!hasPermissionInUser) {
						user.permissions.push({
							permissionCode: permission.code,
							object: object._id
						});
						// Save
						user.save()
							.then(function() {
								deferred.resolve('Permission "' + permission.code + '" for object "' + object.name + '" has been inserted successfully into the user "' + user.name + '".');
							}, function (err) {
								deferred.reject(err);
							});
					}
					else {
						// It does have the permission, just return to client
						deferred.resolve('User "' + user.name + '" already has the permission "' + permission.code + '" for the object "' + object.name + '".');
					}
				}
			})
		}
		catch(ex) {
			deferred.reject(ex);
		}

		return deferred.promise;
	},
	clearPermissions: function (userId) {
		var deferred = Q.defer();

		try {
			var promises = [
				Users.findOne({_id: userId})
			];

			Q.allSettled(promises).then(function (results) {
				var user = results[0].value;

				if(!user) {
						deferred.reject('User with id ' + userId + ' not found!')
				}
				else {
					// Clear permissions
					user.permissions = [];

					// Save
					user.save()
						.then(function() {
							deferred.resolve('All permisions from user "' + user.name + '" have been cleared.');
						}, function (err) {
							deferred.reject(err);
						});
				}
			})
		}
		catch(ex) {
			deferred.reject(ex);
		}

		return deferred.promise;
	},
	checkPermissionForObject: function (userId, permissionCode, objectId) {
		var deferred = Q.defer();

		try {
			var promises = [
				Users.findOne({_id: userId}),
				Permissions.findOne({code: { $regex: new RegExp("^" + permissionCode, "i") }}), // Case insensitive
				Objects.findOne({_id: objectId}),
			];

			Q.allSettled(promises).then(function (results) {
				var user = results[0].value;
				var permission = results[1].value;
				var object = results[2].value;

				if(!user) {
						deferred.reject('User with id ' + userId + ' not found!')
				}
				else if(!permission) {
						deferred.reject('Permission with code "' + permissionCode + '" not found!')
				}
				else if(!object) {
						deferred.reject('Object with id ' + objectId + ' not found!')
				}
				else {
					// Check if user has permission to a specific object
					var hasUserPermissionForGroup = _.find(user.permissions, function(p) {
						return (p.permissionCode.toLowerCase() === permission.code.toLowerCase() && p.object.toString() === objectId);
					});

					// If array is empty, it will return undefined, so return false
					deferred.resolve(hasUserPermissionForGroup ? true : false);
				}
			})
		}
		catch(ex) {
			deferred.reject(ex);
		}

		return deferred.promise;
	},
	getPermissionsForObject: function (userId, objectId) {
		var deferred = Q.defer();

		try {
			var promises = [
				Users.findOne({_id: userId}),
				Objects.findOne({_id: objectId}),
			];

			Q.allSettled(promises).then(function (results) {
				var user = results[0].value;
				var object = results[1].value;

				if(!user) {
						deferred.reject('User with id ' + userId + ' not found!')
				}
				else if(!object) {
						deferred.reject('Object with id ' + objectId + ' not found!')
				}
				else {
					// Get user's permissions to a specific object
					var permissionsForObject = _.filter(user.permissions,
						_.matches({ 'object': object._id }))
						.map(function (p) {
							return p.permissionCode;
						});

					deferred.resolve(permissionsForObject);
				}
			})
		}
		catch(ex) {
			deferred.reject(ex);
		}

		return deferred.promise;
	},
	getList: function () {
			var deferred = Q.defer();

			try {
				Users.find({}).populate('permissions.object').then(function (groups) {
					deferred.resolve(groups);
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
