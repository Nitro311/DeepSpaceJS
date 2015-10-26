"use strict";

var world;

function loadNewWorld() {
	var createNewWorldDialog = function() {
		easygui.inputBox("What do you want to name your world", "Create New World", null, "example: Phobos", createNewWorld);
	}

	var worldChoices = World.getNames().slice(0);

	if (worldChoices.length === 0) {
		createNewWorldDialog();
		return;
	}

	worldChoices.push("New");

	easygui.buttonBox("Choose a world to load:", "World Selector", worldChoices, function(index, value) {
		if (index === worldChoices.length - 1) {
			createNewWorldDialog();
		} else {
			var loadedWorld = World.load(value);

			if (loadedWorld) {
				notification.info('Loaded existing world: ' + value);
				world = loadedWorld;
			} else {
				notification.danger('Could not find world to load it: ' + value);
			}
		}
	});
};

function createNewWorld(name) {
	if (!name)
		return;

	world = World.create(name);

	notification.info('Created new world: ' + name);
};

var world;

$(function() {
	$('.menu__toggle-log-button').on('click', function() {
		logging.toggle();
	});

	$('.menu__clear-storage-button').on('click', function() {
		logging.info("Clearing storage");
		storage.clear();
	});

	$('.menu__load-new-world-button').on('click', function() {
		logging.info("Loading new world");
		loadNewWorld();
	});
});

