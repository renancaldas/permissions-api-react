'use strict';

/* NPM Dependencies
---------------------------------*/
const debug = require('debug')("permissionsApiRenan:groups.js");
const mongoose = require('mongoose');
const request = require('request');
const Q = require('q');
const _ = require('lodash');

/* Model Schema
---------------------------------*/
var groupPermissionsSchema = new mongoose.Schema({
	permissionCode: {type: String, required: true},
	object: {type: mongoose.Schema.ObjectId, ref: "objects"},
});

var groupsSchema = new mongoose.Schema({
	name: {type: String, required: true},
	users: [{type: mongoose.Schema.ObjectId, ref: "users"}],
	permissions: [ groupPermissionsSchema ]
}, {collection: 'groups'});

var Groups = mongoose.model('groups', groupsSchema);

/* Model Dependencies
---------------------------------*/
var Users = require('./users.js').model;
var Permissions = require('./permissions.js').model;
var Objects = require('./objects.js').model;

module.exports = {
	addUserToGroup: function (userId, groupId) {
			var deferred = Q.defer();

			try {
				var promises = [
					Groups.findOne({_id: groupId}),
					Users.findOne({_id: userId}),
				];

				Q.allSettled(promises).then(function (results) {
					//var rejects = _.filter(results, {state: 'rejected'});
					var group = results[0].value;
					var user = results[1].value;

					if(!group) {
							deferred.reject('Group with id ' + groupId + ' not found!')
					}
					else if(!user){
							deferred.reject('User with id ' + userId + ' not found!')
					}
					else {
						// Check if user is in group
						var hasUserInGroup = group.users.indexOf(user._id) != -1;
						if(!hasUserInGroup) {
							group.users.push(user._id);

							// Save
							group.save()
								.then(function() {
									deferred.resolve('User "' + user.name + '" has been inserted successfully into the group "' + group.name + '".');
								}, function (err) {
									deferred.reject(err);
								});
						}
						else {
							// User alredy inserted in group
							deferred.resolve('User "' + user.name + '" was already inserted in the group "' + group.name + '".');
						}
					}
				})
			}
			catch(ex) {
				deferred.reject(ex);
			}

			return deferred.promise;
	},
	clearGroup: function (groupId) {
			var deferred = Q.defer();

			try {
				Groups.findOne({_id: groupId}).then(function (group) {
					if(!group) {
							deferred.reject('Group with id ' + groupId + ' not found!')
					}
					else {
						// Clear users
						group.users = [];

						// Save
						group.save()
							.then(function() {
								deferred.resolve('Group "' + group.name + '" has been cleared successfully.');
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
	addPermission: function (groupId, permissionCode, objectId) {
		var deferred = Q.defer();

		try {
			var promises = [
				Groups.findOne({_id: groupId}),
				Permissions.findOne({code: { $regex: new RegExp("^" + permissionCode, "i") }}), // Case insensitive
				Objects.findOne({_id: objectId}),
			];

			Q.allSettled(promises).then(function (results) {
				//var rejects = _.filter(results, {state: 'rejected'});
				var group = results[0].value;
				var permission = results[1].value;
				var object = results[2].value;

				if(!group) {
						deferred.reject('Group with id ' + groupId + ' not found!')
				}
				else if(!permission) {
						deferred.reject('Permission with code ' + permissionCode + ' not found!')
				}
				else if(!object) {
						deferred.reject('Object with id ' + objectId + ' not found!')
				}
				else {
					// Check if group already has permission to a specific object
					var hasPermissionInGroup = _.find(group.permissions, function(p) {
						return (p.permissionCode.toLowerCase() === permission.code.toLowerCase() && p.object.toString() === objectId);
					});

					// It doesn't have, add new permission
					if(!hasPermissionInGroup) {
						group.permissions.push({
							permissionCode: permission.code,
							object: object._id
						});

						// Save
						group.save()
							.then(function() {
								deferred.resolve('Permission "' + permission.code + '" for object "' + object.name + '" has been inserted successfully into the group "' + group.name + '".');
							}, function (err) {
								deferred.reject(err);
							});
					}
					else {
						// It does have the permission, just return to client
						deferred.resolve('Group "' + group.name + '" already has the permission "' + permission.code + '" for the object "' + object.name + '".');
					}
				}
			})
		}
		catch(ex) {
			deferred.reject(ex);
		}

		return deferred.promise;
	},
	clearPermissions: function (groupId) {
		var deferred = Q.defer();

		try {
			var promises = [
				Groups.findOne({_id: groupId})
			];

			Q.allSettled(promises).then(function (results) {
				var group = results[0].value;

				if(!group) {
						deferred.reject('Group with id ' + groupId + ' not found!')
				}
				else {
					// Clear permissions
					group.permissions = [];

					// Save
					group.save()
						.then(function() {
							deferred.resolve('All permisions from group "' + group.name + '" have been cleared.');
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
	getList: function () {
			var deferred = Q.defer();

			try {
				Groups.find({}).populate('users permissions.object').then(function (groups) {
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
