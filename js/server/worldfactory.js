/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals storage, logging, World, Sector, security*/
/*exported worldFactory*/
"use strict";

var worldFactory = (function ($, storage, logging, security) {
	const GLOBAL_RESERVED = '*';

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

		var sector_names = shuffle(starNames);
		sectors[100].name = sector_names[0];
		sector_names.splice(0, 1);

		while (new_pool.length > 0) {
			var new_id = new_pool[0];
			var current_id = randomChoice(current_pool);

			sectors[current_id].routes.push(new_id);
			sectors[new_id].routes.push(current_id);
			sectors[new_id].name = sector_names[0];
			sector_names.splice(0, 1);

			new_pool.splice(0, 1);
			current_pool.push(new_id);
		}

		for (var r = 0; r < 50; r++) {
			var from_id = randomChoice(Object.keys(sectors));
			var to_id = randomChoice(Object.keys(sectors));

			// Guarantee it is not a loopback
			while (to_id === from_id) {
				to_id = randomChoice(Object.keys(sectors));
			}

			sectors[from_id].warps.push(to_id);
		}

		return sectors;
	};

	var generatePorts = function (sectors) {
		logging.info('Generating ports');

		var ports = {};
		var places_without_port = shuffle(Object.keys(sectors));
		var location;

		for (var i = 0; i < 100; i++) {
			location = places_without_port[0];
			ports[location] = new MiningPort();
			places_without_port.splice(0, 1);
		}

		for (var j = 0; j < 100; j++) {
			location = places_without_port[0];
			ports[location] = new ManufacturingPort()
			places_without_port.splice(0, 1);
		}

		for (var k = 0; k < 100; k++) {
			location = places_without_port[0];
			ports[location] = new FarmingPort()
			places_without_port.splice(0, 1);
		}

		// Place the star dock in a very well-connected area
		var stardock_location = 100;
		for (var l = 0; i < places_without_port.length; l++) {
			location = places_without_port[l];
			if (sectors[location].routes.length > sectors[stardock_location].routes.length) {
				stardock_location = location;
			}
		}
		sectors[stardock_location].name = "Star Dock"
		ports[stardock_location] = new Stardock();

		return ports;
	};

	return {
		getList: function() {
			return storage.loadData(GLOBAL_RESERVED, 'worlds') || [];
		},
		existsByName: function(name) {
			var worlds = worldFactory.getList();

			for (var world of worlds) {
				if (world.name === name) {
					return true;
				}
			}

			return false;
		},
		existsByToken: function(token) {
			var worlds = worldFactory.getList();

			for (var world of worlds) {
				if (world.token === token) {
					return true;
				}
			}

			return false;
		},
		create: function(name, proposedToken) {
			if (!name) {
				return;
			}
			name = name.trim();
			var token = security.slugify(proposedToken || name);

			if (name === GLOBAL_RESERVED || token === GLOBAL_RESERVED || worldFactory.existsByName(name) || worldFactory.existsByToken(token)) {
				return;
			}

			var sectors = generateSectors();
			var ports = generatePorts(sectors);
			var chat_log = null; //new ChatLog();
			var players = {};

			var world = new World(name, token, sectors, ports, players, chat_log);
			this.save(world);

			// Add to global world list so it can be discovered later
			var worldList = worldFactory.getList().slice(0);
			worldList.push({ name: name, token: token });
			storage.saveData(GLOBAL_RESERVED, 'worlds', worldList);

			return world;
		},
		get: function(token) {
			if (!worldFactory.existsByToken(token)) {
				return;
			}

			var metadata = storage.loadData(token, GLOBAL_RESERVED);
			var sectors = storage.loadData(token, 'sectors');
			var ports = storage.loadData(token, 'ports');
			var chat_log = storage.loadData(token, 'chatlog');
			var players = storage.loadData(token, 'players');

			return new World(metadata.name, metadata.token, sectors, ports, players, chat_log);
		},
		save: function (world) {
			storage.saveData(world.token, GLOBAL_RESERVED, { name: world.name, token: world.token });
			storage.saveData(world.token, 'sectors', world.sectors);
			storage.saveData(world.token, 'ports', world.ports);
			storage.saveData(world.token, 'chat_log', world.chat_log);
			this.savePlayers(world);
		},
		savePlayers: function (world) {
			storage.saveData(world.token, 'players', world.players);
		}
	};
}(jQuery, storage, logging, security));
