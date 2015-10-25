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

World.load = function(world_name) {
	var sectors = load_data(world_name, "sectors");
	/* if (!sectors)
		sectors = generate_sectors();*/
	var ports = load_data(world_name, "ports");
	/*if (!ports)
		ports = generate_ports(sectors);*/
	// TODO: Figure this out
	var stardock_location = 0;
	var chat_log = load_data(world_name, "chatlog");
	/*if (!chat_log)
		chat_log = new ChatLog();*/
	var players = load_data(world_name, "players");
	if (!players)
		players = [];

	return new World(world_name, sectors, ports, stardock_location, players, chat_log);
};

World.prototype.save = function() {
	save_data(this.name, "sectors", this.sectors);
	save_data(this.name, "ports", this.ports);
	save_data(this.name, "chat_log", this.chat_log);
	save_data(this.name, "players", this.players);
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
