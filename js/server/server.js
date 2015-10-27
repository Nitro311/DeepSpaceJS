/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals worldFactory,storage,userFactory*/
/*exported server*/
"use strict";

var server = (function (worldFactory,userFactory,storage) {
	return {
		OK_RESULT: 200,
		INVALID_CREDENTIALS: 403,
		NOT_FOUND_RESULT: 404,
		SERVER_ERROR: 500,
		NOT_IMPLEMENTED: 503,

		adminStorageClear: function (onSuccess, onFailure) {
			console.log('SERVER: DELETE /admin/storage');
			storage.clear();

			if (onSuccess) {
				onSuccess();
			}
		},
		userAuthenticate: function (email, password, onSuccess, onFailure) {
			console.log('SERVER: POST /users/authenticate');

			var data = userFactory.getOnValidSignIn(email, password);
			if (!data) {
				if (onFailure) {
					onFailure({ code: this.INVALID_CREDENTIALS });
				}

				return;
			}

			if (onSuccess) {
				onSuccess(data);
			}
		},
		userForgotPassword: function(email, onSuccess, onFailure) {
			console.log('SERVER: POST /users/forgot');
			if (onFailure) {
				onFailure({ code: this.NOT_IMPLEMENTED });
			}
		},
		userSignOut: function(onSuccess, onFailure) {
			console.log('SERVER: POST /users/signout');
			if (onSuccess) {
				onSuccess();
			}
		},
		userSignUp: function(email, password, onSuccess, onFailure) {
			console.log('SERVER: POST /users/signup');
			var data;

			// Check if user already exists, if so, try to sign them in
			if (userFactory.exists(email)) {
				data = userFactory.getOnValidSignIn(email, password);
				if (!data) {
					if (onFailure) {
						onFailure({ code: this.INVALID_CREDENTIALS });
					}

					return;
				}

				if (onSuccess) {
					onSuccess(data);
				}
			}

			userFactory.create(email, password);
			data = userFactory.get(email);

			if (!data) {
				if (onFailure) {
					onFailure({ code: this.SERVER_ERROR });
				}
				return;
			}

			if (onSuccess) {
				onSuccess(data);
			}
		},
		worldList: function (onSuccess, onFailure) {
			console.log('SERVER: GET /worlds');
			var data = worldFactory.getNames();
			if (onSuccess) {
				onSuccess(data);
			}
		},
		worldView: function (token, onSuccess, onFailure) {
			console.log('SERVER: GET /worlds/' + token);
			var data = { world: worldFactory.load(token) };

			if (!data.world) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND_RESULT, message: "World not found" });
				}
				return;
			}

			if (onSuccess) {
				// TODO: Map this data
				onSuccess(data);
			}
		},
		worldJoin: function (token, onSuccess, onFailure) {
			console.log('SERVER: POST /worlds/' + token + '/join');
			var isThere = worldFactory.exists(token);

			if (!isThere) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND_RESULT, message: "World not found" });
				}
				return;
			}

			if (onSuccess) {
				onSuccess();
			}
		},
		worldCreate: function(token, name, onSuccess, onFailure) {
			console.log('SERVER: POST /worlds/' + token + '/create');
			var world = worldFactory.create(name);

			if (onSuccess) {
				onSuccess({ name: name, token: token });
			}
		}
	};
}(worldFactory, userFactory, storage));
