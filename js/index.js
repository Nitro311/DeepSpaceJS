/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals easygui, World, worldFactory, notification, logging, storage*/
"use strict";

function loadDifferentWorldFailure() {
	notification.danger("Could not get list of worlds");
}

function loadDifferentWorldSuccess(worlds) {
	var createNewWorldDialog = function () {
		easygui.inputBox("What do you want to name your world", "Create New World", null, "example: Phobos", function (value) {
			if (!value) {
				return;
			}
			
			// TODO: Make a valid token
			var token = value;

			server.worldCreate(token, value, createNewWorldSuccess, createNewWorldFailure);
		});
	};

	if (worlds.length === 0) {
		createNewWorldDialog();
		return;
	}

	worlds.push("New");

	easygui.buttonBox("Choose a world to load:", "World Selector", worlds, function (index, value) {
		if (index === worlds.length - 1) {
			createNewWorldDialog();
		} else {
			server.worldView(value, loadWorldSuccess, loadWorldFailure); 
		}
	});
}

function loadWorldSuccess(data) {
	window.world = data.world;
}

function loadWorldFailure() {
	notification.danger('Could not find world to load it');
}

function createNewWorldFailure() {
	notification.danger("Could not get create world");
}

function createNewWorldSuccess(data) {
	notification.info('Created new world: ' + data.name);
	server.worldView(data.token, loadWorldSuccess, loadWorldFailure);
}

$(function () {
	$('.menu__toggle-log-button').on('click', function () {
		logging.toggle();
	});

	$('.menu__clear-storage-button').on('click', function () {
		server.adminStorageClear(function() {
			logging.info("Cleared storage");
			notification.info('Storage cleared');
		});
	});

	$('.menu__load-new-world-button').on('click', function () {
		logging.info("Loading new world");
		server.worldList(loadDifferentWorldSuccess, loadDifferentWorldFailure);
	});
});

