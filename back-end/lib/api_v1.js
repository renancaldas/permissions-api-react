'use strict';

/* NPM Dependencies
---------------------------------*/
const debug = require("debug")("permissionsApiRenan:lib:api_v1.js");
const config = require('config').get('config');
const express = require('express');
const bodyParser  = require( 'body-parser' );
const app = express();
const _  = require('lodash');
const Q  = require('q');

/* Local Dependencies
---------------------------------*/
const Responses = require('./responses.js');
const Groups = require('../models/groups.js');
const Users = require('../models/users.js');
const Permissions = require('../models/permissions.js');
const Objects = require('../models/objects.js');

/* Global variables
---------------------------------*/
const ObjectId = require('mongoose').Types.ObjectId;
const api_v1 = express.Router();

/* Routes
---------------------------------*/

// - for adding a user to a group
api_v1.route('/group/:groupId/user/:userId')
	.put(function(req, res) {
		debug('[PUT] /group/:groupId/user/:userId');

		var userId = req.params.userId;
		var groupId = req.params.groupId;

		Groups.addUserToGroup(userId, groupId).then(function(result) {
				Responses(res).success(result);
		}, function (err) {
				Responses(res).error(err);
		});
	});

// - for clearing all users from a group
api_v1.route('/group/:groupId/clear')
	.delete(function(req, res) {
		try {
			debug('[DELETE] /group/:groupId/clear');

			var groupId = req.params.groupId;

			Groups.clearGroup(groupId).then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});

// - for adding a permission to a user or group.
api_v1.route('/group/:groupId/permission/:permissionCode/object/:objectId')
	.put(function(req, res) {
		try {
			debug('[PUT] /group/:groupId/permission/:permissionCode/object/:objectId');

			var groupId = req.params.groupId;
			var permissionCode = req.params.permissionCode;
			var objectId = req.params.objectId;

			Groups.addPermission(groupId, permissionCode, objectId).then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});
api_v1.route('/user/:userId/permission/:permissionCode/object/:objectId')
		.put(function(req, res) {
			try {
				debug('[PUT] /user/:userId/permission/:permissionCode/object/:objectId');

				var userId = req.params.userId;
				var permissionCode = req.params.permissionCode;
				var objectId = req.params.objectId;

				Users.addPermission(userId, permissionCode, objectId).then(function(result) {
						Responses(res).success(result);
				}, function (err) {
						Responses(res).error(err);
				});
			}
			catch(ex) {
				Responses(res).error(ex);
			}
		});

// - for clearing all permissions directly associated with a user or group.
//   (this clear operation does not affect permissions that are inherited by a user from group membership.)
api_v1.route('/group/:groupId/permissions')
	.delete(function(req, res) {
		try {
			debug('[DELETE] /group/:groupId/permissions');

			var groupId = req.params.groupId;

			Groups.clearPermissions(groupId).then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});
api_v1.route('/user/:userId/permissions')
		.delete(function(req, res) {
			try {
				debug('[DELETE] /user/:userId/permissions');

				var userId = req.params.userId;

				Users.clearPermissions(userId).then(function(result) {
						Responses(res).success(result);
				}, function (err) {
						Responses(res).error(err);
				});
			}
			catch(ex) {
				Responses(res).error(ex);
			}
		});

// - for testing if a particular user has a particular permission over a particular object.
api_v1.route('/user/:userId/permission/:permissionCode/object/:objectId')
	.get(function(req, res) {
		try {
			debug('[GET] /user/:userId/permission/:permissionCode/object/:objectId');

			var userId = req.params.userId;
			var permissionCode = req.params.permissionCode;
			var objectId = req.params.objectId;

			Users.checkPermissionForObject(userId, permissionCode, objectId).then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});

// - for querying what permissions a particular user has over a particular object.
api_v1.route('/user/:userId/object/:objectId')
	.get(function(req, res) {
		try {
			debug('[GET] /user/:userId/object/:objectId');

			var userId = req.params.userId;
			var objectId = req.params.objectId;

			Users.getPermissionsForObject(userId, objectId).then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});


// Custom endpoints
// ---------------------------------
api_v1.route('/groups')
	.get(function(req, res) {
		try {
			debug('[GET] /groups');

			Groups.getList().then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});

api_v1.route('/users')
	.get(function(req, res) {
		try {
			debug('[GET] /users');

			Users.getList().then(function(result) {
					Responses(res).success(result);
			}, function (err) {
					Responses(res).error(err);
			});
		}
		catch(ex) {
			Responses(res).error(ex);
		}
	});

api_v1.route('/permissions')
		.get(function(req, res) {
			try {
				debug('[GET] /permissions');

				Permissions.getList().then(function(result) {
						Responses(res).success(result);
				}, function (err) {
						Responses(res).error(err);
				});
			}
			catch(ex) {
				Responses(res).error(ex);
			}
		});

api_v1.route('/objects')
		.get(function(req, res) {
			try {
				debug('[GET] /objects');

				Objects.getList().then(function(result) {
						Responses(res).success(result);
				}, function (err) {
						Responses(res).error(err);
				});
			}
			catch(ex) {
				Responses(res).error(ex);
			}
		});


module.exports = api_v1;
