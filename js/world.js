/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported World, Sector, Player, Port*/
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
