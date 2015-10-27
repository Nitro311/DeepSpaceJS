/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals worldFactory*/
/*exported server*/
"use strict";

var server = (function (worldFactory) {
	return {
		OK_RESULT: 200,
		NOT_FOUND_RESULT: 404,
		
		adminStorageClear: function (onSuccess, onFailure) {
			console.log('DELETE /admin/storage');
			storage.clear();
			
			if (onSuccess) {
				onSuccess();
			}
		},
		userAuthenticate: function (emailAddress, password, onSuccess, onFailure) {
			var data = { name: 'Black Beard', token: 'black-beard47' }
			
			if (onSuccess) {
				onSuccess(data);
			}
		},
		worldList: function (onSuccess, onFailure) {
			console.log('SERVER: GET /world');
			var data = worldFactory.getNames();
			if (onSuccess) {
				onSuccess(data);
			}
		},
		worldView: function (token, onSuccess, onFailure) {
			console.log('SERVER: GET /world/' + token);
			var data = { world: worldFactory.load(token) };
			
			if (!data.world) {
				if (onFailure) {
					onFailure({ code: NOT_FOUND_RESULT, message: "World not found" });
				}
				return;
			}
			
			if (onSuccess) {
				// TODO: Map this data
				onSuccess(data);
			}
		},
		worldJoin: function (token, onSuccess, onFailure) {
			console.log('SERVER: POST /world/' + token + '/join');
			var isThere = worldFactory.exists(token);
			
			if (!isThere) {
				if (onFailure) {
					onFailure({ code: NOT_FOUND_RESULT, message: "World not found" });
				}
				return;
			}
			
			if (onSuccess) {
				onSuccess();
			}		
		},
		worldCreate: function(token, name, onSuccess, onFailure) {
			console.log('SERVER: POST /world/' + token + '/create');
			var world = worldFactory.create(name);
			
			if (onSuccess) {
				onSuccess({ name: name, token: token });
			}
		}
	};
}(worldFactory));

server.OK_RESULT = 200;
server.NOT_FOUND_RESULT = 404;
