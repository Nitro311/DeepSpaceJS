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

World.getNames = function() {
	return storage.loadData('*', 'worlds') || [];
}

World.exists = function(name) {
	return $.inArray(name, World.getNames()) >= 0;
}

World.create = function(name) {
	if (World.exists(name) || name === '*')
		return;

	// TODO: Implement this function
	var sectors = null; //generate_sectors();
	var ports = null; //generate_ports(sectors);
	// TODO: Figure this out
	var stardock_location = 0;
	var chat_log = null; //new ChatLog();
	var players = [];

	var world = new World(name, sectors, ports, stardock_location, players, chat_log);
	world.save();

	// Add to global world list so it can be discovered later
	var worldList = World.getNames().slice(0);
	worldList.push(name);
	storage.saveData('*', 'worlds', worldList);

	return world;
};

World.load = function(name) {
	if (!World.exists(name))
		return;

	var sectors = storage.loadData(name, "sectors");
	var ports = storage.loadData(name, "ports");
	// TODO: Figure this out
	var stardock_location = 0;
	var chat_log = storage.loadData(name, "chatlog");
	var players = storage.loadData(name, "players");

	return new World(name, sectors, ports, stardock_location, players, chat_log);
};

World.prototype.save = function() {
	storage.saveData(this.name, "sectors", this.sectors);
	storage.saveData(this.name, "ports", this.ports);
	storage.saveData(this.name, "chat_log", this.chat_log);
	storage.saveData(this.name, "players", this.players);
}

class Sector {
	constructor(warps, routes, name) {
		this.warps = warps;
		this.routes = routes;
		this.name = name;
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
