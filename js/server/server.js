/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals Player, worldFactory, storage, userFactory*/
/*exported server*/
"use strict";

var server = (function (worldFactory, userFactory, storage) {
	return {
		OK_RESULT: 200,
		INVALID_CREDENTIALS: 403,
		NOT_FOUND: 404,
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
		playerMoveTo: function (worldToken, playerToken, sector, onSuccess, onFailure) {
			console.log('SERVER POST /worlds/' + worldToken + '/player/' + playerToken + '/move?sector=' + sector);

			var world = worldFactory.get(worldToken);
			if (!world) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND });
				}
				return;
			}
			var player = world.players[playerToken];
			if (!player) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND });
				}
				return;
			}

			// TODO: Determine if is valid move
			// TODO: initiate combat/defenses? Or save that until successful view?
			player.location = sector;

			worldFactory.savePlayers(world);

			if (onSuccess) {
				onSuccess();
			}
		},
		worldList: function (onSuccess, onFailure) {
			console.log('SERVER: GET /worlds');
			var data = worldFactory.getList();
			if (onSuccess) {
				onSuccess(data);
			}
		},
		worldView: function (token, onSuccess, onFailure) {
			console.log('SERVER: GET /worlds/' + token);
			var data = { world: worldFactory.get(token) };

			if (!data.world) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND, message: "World not found" });
				}
				return;
			}

			if (onSuccess) {
				// TODO: Map this data
				onSuccess(data);
			}
		},
		worldJoin: function (token, userToken, onSuccess, onFailure) {
			console.log('SERVER: POST /worlds/' + token + '/join?user=' + userToken);
			var world = worldFactory.get(token);

			if (!world) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND, message: "World not found" });
				}
				return;
			}

			var user = userFactory.getByToken(userToken);

			if (!user) {
				if (onFailure) {
					onFailure({ code: this.NOT_FOUND, message: "User not found" });
				}
				return;
			}

			if (!world.players[user.token]) {
				var newPlayer = new Player();
				newPlayer.name = user.email;
				newPlayer.token = user.token;
				newPlayer.location = world.stardock_location;
				world.players[user.token] = newPlayer;
				worldFactory.save(world);
			}

			if (onSuccess) {
				onSuccess(world);
			}
		},
		worldCreate: function(name, token, onSuccess, onFailure) {
			console.log('SERVER: PUT /worlds?name=' + name + '&token=' + token);
			var world = worldFactory.create(name, token);

			if (!world) {
				if (onFailure) {
					onFailure();
				}
				return;
			}

			if (onSuccess) {
				onSuccess({ name: world.name, token: world.token });
			}
		}
	};
}(worldFactory, userFactory, storage));
