/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals storage, logging, Enumerable, security, md5*/
/*exported userFactory*/
"use strict";

var userFactory = (function ($, storage, logging, security, md5) {
	var userMap = function(source) {
		if (!source) {
			return null;
		}
		return {
			email: source.email,
			token: source.token,
			avatar: source.avatar
		};
	};

	var loadRaw = function() {
		return storage.loadData('*', 'users') || [];
	};

	return {
		getAll: function() {
			return Enumerable.From(loadRaw())
				.Select(userMap);
		},
		exists: function(email) {
			return Enumerable.From(loadRaw())
				.Any(function (x) { return x.email === email; });
		},
		create: function(email, password) {
			if (!email) {
				return false;
			}

			email = email.trim().toLowerCase();

			if (userFactory.exists(email)) {
				return false;
			}

			var rawData = loadRaw();
			var salt = security.randomString(32);
			var hash = md5(salt + password);
			var avatarHash = md5(email);
			var token = security.randomString(32);

			rawData.push({ email: email, passwordHash: hash, token: token, salt: salt, avatar: 'http://www.gravatar.com/avatar/' + avatarHash + '.jpg?s=60&d=mm' });

			storage.saveData('*', 'users', rawData);
		},
		get: function(email) {
			return Enumerable.From(loadRaw())
				.Where(function (x) { return x.email === email; })
				.Select(userMap)
				.FirstOrDefault();
		},
		getByToken: function(token) {
			return Enumerable.From(loadRaw())
				.Where(function (x) { return x.token === token; })
				.Select(userMap)
				.FirstOrDefault();
		},
		getOnValidSignIn: function (email, password) {
			var user = Enumerable.From(loadRaw())
				.Where(function (x) { return x.email === email; })
				.FirstOrDefault();

			if (user) {
				if (user.passwordHash === md5(user.salt + password)) {
					return userMap(user);
				}
			}
		}
	};
}(jQuery, storage, logging, security, md5));
