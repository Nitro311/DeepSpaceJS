/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals Player, worldFactory, storage, userFactory, queue, statusCode*/
/*exported server*/
"use strict";

var server = (function (worldFactory, userFactory, storage, queue, statusCode) {
	return {
		routes: null,

		send: function (request) {
			if (!request) {
				return;
			}
			if (!request.route) {
				console.log('No route specified in queue request: ' + request);
				console.log(request);
				return;
			}

			if (!this.routes) {
				console.log('Loading route table');
				this.routes = {};
				this.routes[queue.adminStorageClearRoute] = this.adminStorageClear;
				this.routes[queue.userForgotPasswordRoute] = this.userForgotPassword;
				this.routes[queue.userSignInRoute] = this.userSignIn;
				this.routes[queue.userSignOutRoute] = this.userSignOut;
				this.routes[queue.userSignUpRoute] = this.userSignUp;
				this.routes[queue.playerMoveToSectorRoute] = this.playerMoveToSector;
				this.routes[queue.playerViewSectorRoute] = this.playerViewSector;
				this.routes[queue.worldCreateRoute] = this.worldCreate;
				this.routes[queue.worldJoinRoute] = this.worldJoin;
				this.routes[queue.worldsGetRoute] = this.worldsGet;
			}

			console.log('INITIATING: ' + request.route);

			var action = this.routes[request.route];

			if (action) {
				action(request);
			} else {
				console.log('Unrecognized queue request: ' + request.route + '. Check that the route exists AND the method is defined');
			}

			console.log('COMPLETED: ' + request.route);
		},

		adminStorageClear: function (request) {
			if (!request.userToken) {
				return request.onFailure({ code: statusCode.NOT_FOUND });
			}

			// TODO: Check if authorized
			if (request.userToken === 'NON-ADMIN-USER') {
				return request.onFailure({ code: statusCode.UNAUTHORIZED });
			}

			storage.clear();

			return request.onSuccess();
		},

		userForgotPassword: function(request) {
			return request.onFailure({ code: statusCode.NOT_IMPLEMENTED });
		},
		userSignIn: function (request) {
			var user = userFactory.getOnValidSignIn(request.email, request.password);
			if (!user) {
				return request.onFailure({ code: statusCode.UNAUTHORIZED });
			}

			return request.onSuccess({ code: statusCode.OK, user: user });
		},
		userSignOut: function(request) {
			return request.onSuccess({ code: statusCode.OK });
		},
		userSignUp: function(request) {
			var user;

			// Check if user already exists, if so, try to sign them in
			if (userFactory.exists(request.email)) {
				user = userFactory.getOnValidSignIn(request.email, request.password);
				if (!user) {
					return request.onFailure({ code: statusCode.CONFLICT });
				} else {
					return request.onSuccess({ code: statusCode.OK, user: user });
				}
			}

			userFactory.create(request.email, request.password);
			user = userFactory.get(request.email);

			if (!user) {
				return request.onFailure({ code: statusCode.SERVER_ERROR });
			}

			return request.onSuccess({ code: statusCode.OK, user: user });
		},

		playerMoveToSector: function (request) {
			var world = worldFactory.get(request.worldToken);
			if (!world) {
				return request.onFailure({ code: statusCode.NOT_FOUND });
			}
			var player = world.players[request.playerToken];
			if (!player) {
				return request.onFailure({ code: statusCode.NOT_FOUND });
			}

			if (world.sectors[player.location].routes.indexOf(request.sector) < 0) {
				return request.onFailure({ code: statusCode.NOT_ALLOWED });
			}

			// TODO: initiate combat/defenses? Or save that until successful view?
			player.location = request.sector;

			worldFactory.savePlayers(world);

			return request.onSuccess({ code: statusCode.OK, world: world, player: player });
		},

		playerViewSector: function (request) {
			var world = worldFactory.get(request.worldToken);
			if (!world) {
				return request.onFailure({ code: statusCode.NOT_FOUND });
			}
			var player = world.players[request.playerToken];
			if (!player) {
				return request.onFailure({ code: statusCode.NOT_FOUND });
			}

			return request.onSuccess({ code: statusCode.OK, world: world, player: player });
		},

		worldsGet: function (request) {
			var worlds = worldFactory.getList();

			// TODO: Determine if user is signed in using request.userToken
			return request.onSuccess({ code: statusCode.OK, worlds: worlds });
		},
		worldJoin: function (request) {
			var world = worldFactory.get(request.worldToken);

			if (!world) {
				return request.onFailure({ code: statusCode.NOT_FOUND, message: "World not found" });
			}

			var user = userFactory.getByToken(request.userToken);

			if (!user) {
				return request.onFailure({ code: statusCode.NOT_FOUND, message: "User not found" });
			}

			if (!world.players[user.token]) {
				var newPlayer = new Player();
				newPlayer.name = user.email;
				newPlayer.token = user.token;
				newPlayer.location = world.stardock_location;
				world.players[user.token] = newPlayer;
				worldFactory.save(world);
			}

			return request.onSuccess({ code: statusCode.OK, world: world, player: world.players[user.token] });
		},
		worldCreate: function(request) {
			// TODO: Use the request.userToken at some point
			var world = worldFactory.create(request.name, request.proposedWorldToken);

			if (!world) {
				return request.onFailure({ code: statusCode.SERVER_ERROR });
			}

			return request.onSuccess({ code: statusCode.OK, name: world.name, token: world.token });
		}
	};
}(worldFactory, userFactory, storage, queue, statusCode));

