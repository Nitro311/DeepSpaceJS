/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals storage, logging*/
/*exported worldFactory*/
"use strict";

class World {
	constructor(name, sectors, ports, stardock_location, players, chat_log) {
		this.name = name;
		this.sectors = sectors;
		this.ports = ports;
		this.stardock_location = stardock_location;
		this.players = players;
		this.chat_log = chat_log;
	}
};

World.prototype.save = function() {
	storage.saveData(this.name, "sectors", this.sectors);
	storage.saveData(this.name, "ports", this.ports);
	storage.saveData(this.name, "chat_log", this.chat_log);
	storage.saveData(this.name, "players", this.players);
};

var worldFactory = (function ($, storage, logging) {
	var randomChoice = function (arr) {
		return arr[Math.floor(arr.length * Math.random())];
	};

	var shuffle = function (array) {
		var counter = array.length, temp, index;

		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	};

	var generateSectors = function () {
		logging.info('Generating sectors');
		var sectors = {};
		var new_pool = [];
		var current_pool = [100];

		for(var id = 100; id < 1000; id++) {
			sectors[id] = new Sector('Sector ' + id, [], []);
			if (id !== 100) {
				new_pool.push(id);
			}
		}

		new_pool = shuffle(new_pool);

		// TODO: Sector names
		//var sector_names = shuffle(...);

		while (new_pool.length > 0) {
			var new_id = new_pool[0];
			var current_id = randomChoice(current_pool);

			sectors[current_id].routes.push(new_id);
			sectors[new_id].routes.push(current_id);
			//sectors[new_id].name = sector_names[0];
			//sector_names.splice(0, 1);

			new_pool.splice(0, 1);
			current_pool.push(new_id);
		}

		for (var r = 0; r < 50; r++) {
			var from_id = randomChoice(Object.keys(sectors));
			var to_id = randomChoice(Object.keys(sectors));

			// Guarantee it is not a loopback
			while (to_id !== from_id) {
				to_id = randomChoice(Object.keys(sectors));
			}

			sectors[from_id].warps.push(to_id);
		}

		return sectors
	};

	var generatePorts = function (sectors) {
		// TODO: Implement this function
		logging.info('Generating ports');
	};

	return {
		getNames: function() {
			return storage.loadData('*', 'worlds') || [];
		},
		exists: function(name) {
			return $.inArray(name, worldFactory.getNames()) >= 0;
		},
		create: function(name) {
			if (worldFactory.exists(name) || name === '*') {
				return;
			}

			var sectors = generateSectors();
			var ports = generatePorts(sectors);
			// TODO: Figure this out
			var stardock_location = 0;
			var chat_log = null; //new ChatLog();
			var players = [];

			var world = new World(name, sectors, ports, stardock_location, players, chat_log);
			world.save();

			// Add to global world list so it can be discovered later
			var worldList = worldFactory.getNames().slice(0);
			worldList.push(name);
			storage.saveData('*', 'worlds', worldList);

			return world;
		},
		load: function(name) {
			if (!worldFactory.exists(name)) {
				return;
			}

			var sectors = storage.loadData(name, "sectors");
			var ports = storage.loadData(name, "ports");
			// TODO: Figure this out
			var stardock_location = 0;
			var chat_log = storage.loadData(name, "chatlog");
			var players = storage.loadData(name, "players");

			return new World(name, sectors, ports, stardock_location, players, chat_log);
		}
	};
}(jQuery, storage, logging));

class Sector {
	constructor(name, routes, warps) {
		this.name = name;
		this.routes = routes;
		this.warps = warps;
	}
};

class Player {
	constructor() {
		this.name = "";
		this.gold_coins = 0;
		this.ship = null;
		this.location = 0;
		//this.area = Area.Space
	}
};

class Port {
	constructor() {
		this.type = "";
		this.resources = {};
		this.buy_prices = {};
		this.sell_prices = {};
		this.strength = 0;
		this.created_resources = {};
	}
};
