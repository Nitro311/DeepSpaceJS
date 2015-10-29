/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported statusCode, queue*/
'use strict';

var statusCode = (function () {
	return {
		OK: 200,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		NOT_ALLOWED: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
		INVALID_DATA: 422,
		SERVER_ERROR: 500,
		NOT_IMPLEMENTED: 503,
	};
}());

var queue = (function () {
	var genericViewSectorSuccessResponse = function (worldResponse, playerResponse) {
		return {
			code: statusCode.OK,
			world: worldResponse || { name: null, token: null }, // TODO: Add more
			player: playerResponse || { name: null, token: null, location: 0 }, // TODO: Add more
		};
	};

	return {
		okResponse: function (response) {
			return { code: statusCode.OK };
		},
		badRequestResponse: function (response) {
			return { code: statusCode.BAD_REQUEST };
		},
		unauthorizedResponse: function (response) {
			return { code: statusCode.UNAUTHORIZED };
		},
		notAllowedResponse: function (response) {
			return { code: statusCode.NOT_ALLOWED };
		},
		notFoundResponse: function (response) {
			return { code: statusCode.NOT_FOUND };
		},
		invalidDataResponse: function (response) {
			return { code: statusCode.INVALID_DATA };
		},
		serverErrorResponse: function (response) {
			return { code: statusCode.SERVER_ERROR };
		},
		notImplementedResponse: function (response) {
			return { code: statusCode.NOT_IMPLEMENTED };
		},

		adminStorageClearRoute: 'DELETE /admin/storage',
		adminStorageClearRequest: function (userToken, onSuccess, onFailure) {
			this.route = this.adminStorageClearRoute;
			this.userToken = userToken;
			this.onSuccess = onSuccess || this.okResponse;
			this.onFailure = onFailure || this.notAllowedResponse;
			return this;
		},

		userForgotPasswordRoute: 'POST /users/forgot',
		userForgotPasswordRequest: function (email, onSuccess, onFailure) {
			return {
				route: this.userForgotPasswordRoute,
				email: email,
				onSuccess: onSuccess || this.okResponse,
				onFailure: onFailure || this.serverErrorResponse,
			}
		},

		userSignInRoute: 'POST /users/signin',
		userSignInRequest: function (email, password, onSuccess, onFailure) {
			return {
				route: this.userSignInRoute,
				email: email,
				password: password,
				onSuccess: onSuccess || function (userSignInSuccessResponse) {},
				onFailure: onFailure || this.invalidCredentialsResponse || this.invalidDataResponse,
			};
		},
		userSignInSuccessResponse: function (email, token, avatar) {
			return {
				code: statusCode.OK,
				user: {
					email: email,
					token: token,
					avatar: avatar,
				}
			};
		},

		userSignInViaCookieRoute: 'POST /users/signin/cookies',
		userSignInViaCookieRequest: function (onSuccess, onFailure) {
			return {
				route: this.userSignInViaCookieRoute,
				onSuccess: onSuccess || function (userSignInSuccessResponse) {},
				onFailure: onFailure || this.notFoundResponse,
			};
		},

		userSignOutRoute: 'POST /users/signout',
		userSignOutRequest: function (userToken, onSuccess, onFailure) {
			return {
				route: this.userSignOutRoute,
				userToken: userToken,
				onSuccess: onSuccess || this.okResponse,
				onFailure: onFailure || this.serverErrorResponse,
			};
		},

		userSignUpRoute: 'PUT /users',
		userSignUpRequest: function (email, password, onSuccess, onFailure) {
			return {
				route: this.userSignUpRoute,
				email: email,
				password: password,
				onSuccess: onSuccess || function (userSignUpSuccessResponse) {},
				onFailure: onFailure || this.notAllowedResponse,
			};
		},
		userSignUpSuccessResponse: function (email, token, avatar) {
			return {
				code: statusCode.OK,
				user: {
					email: email,
					token: token,
					avatar: avatar,
				},
			};
		},

		playerMoveToSectorRoute: 'POST /worlds/{token}/players/{playerToken}/move',
		playerMoveToSectorRequest: function (worldToken, playerToken, sector, onSuccess, onFailure) {
			return {
				route: this.playerMoveToSectorRoute,
				worldToken: worldToken,
				playerToken: playerToken,
				sector: sector,
				onSuccess: onSuccess || function (playerMoveToSectorSuccessResponse) {},
				onFailure: onFailure || this.notAllowedResponse,
			};
		},
		playerMoveToSectorSuccessResponse: genericViewSectorSuccessResponse,

		playerViewSectorRoute: 'GET /worlds/{worldToken}/players/{playerToken}/view',
		playerViewSectorRequest: function (worldToken, playerToken, onSuccess, onFailure) {
			return {
				route: this.playerViewSectorRoute,
				worldToken: worldToken,
				playerToken: playerToken,
				onSuccess: onSuccess || function (playerViewSectorSuccessResponse) {},
				onFailure: onFailure || this.serverErrorResponse,
			};
		},
		playerViewSectorSuccessResponse: genericViewSectorSuccessResponse,

		worldCreateRoute: 'PUT /worlds/',
		worldCreateRequest: function (userToken, name, proposedWorldToken, onSuccess, onFailure) {
			return {
				route: this.worldCreateRoute,
				userToken: userToken,
				name: name,
				proposedWorldToken: proposedWorldToken,
				onSuccess: onSuccess || function (worldCreateSuccessResponse) {},
				onFailure: onFailure || this.notValidResponse || this.conflictResponse || this.notAllowedResponse,
			};
		},
		worldCreateSuccessResponse: function (name, token) {
			return {
				code: statusCode.OK,
				name: name,
				token: token,
			};
		},

		worldJoinRoute: 'PUT /worlds/{worldToken}/users/{userToken}',
		worldJoinRequest: function (worldToken, userToken, onSuccess, onFailure) {
			return {
				route: this.worldJoinRoute,
				worldToken: worldToken,
				userToken: userToken,
				onSuccess: onSuccess || function (worldJoinSuccessResponse) {},
				onFailure: onFailure || this.notFoundResponse || this.notAllowedResponse,
			};
		},
		worldJoinSuccessResponse: genericViewSectorSuccessResponse,

		worldsGetRoute: 'GET /worlds',
		worldsGetRequest: function (userToken, onSuccess, onFailure) {
			return {
				route: this.worldsGetRoute,
				userToken: userToken,
				onSuccess: onSuccess || function (worldGetSucessResponse) {},
				onFailure: onFailure || this.serverErrorResponse,
			};
		},
		worldGetSucessResponse: function (worldArray) {
			return {
				code: statusCode.OK,
				worlds: worldArray || [ { name: null, token: null, playerCount: 0, isJoined: false } ],
			};
		},
	};
}());

