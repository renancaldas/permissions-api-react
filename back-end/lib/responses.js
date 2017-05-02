'use strict';

/* NPM Dependencies
---------------------------------*/
const debug = require("debug")("permissionsApiRenan:lib:responses.js");

module.exports = function(res) {
	return {
		success: function(data) {
			res.status(200).json({
				success: true,
				data: data
			});
		},
		requiredBodyField: function(field) {
			res.status(400).json({
				success: false,
				error: 'Required body field: ' + field
			});
		},
		error: function(error) {
			var errorMessage = 'An error has occurred. Please contact the server admin.';

			if(error.message)
				errorMessage = error.message;
			else if(error && error !== '')
				errorMessage = error;

			res.status(500).json({
				success: false,
				error: errorMessage
			});
		}
	};
}
