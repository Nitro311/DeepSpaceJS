/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported Area, Armor, Equipment, Player, Port, Sector, ShieldGenerator, Ship, World, FarmingPort, ManufacturingPort, MiningPort, StarDock*/
'use strict';

// Basic domain classes, extended in other places
var Area = Object.freeze({Space: 0, Port: 1, Planet: 2});

class Armor {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.rating = 0; // 0-1000
		this.price = 0;
	}
}

class Equipment {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.volume = 0;
		this.mass = 0;
		this.energy_per_use = 0; // PN
		this.ability = '';
		this.price = 0;
	}
}

class Player {
	constructor() {
		this.name = '';
		this.gold_coins = 0;
		this.ship = null;
		this.location = 0;
		this.area = Area.Space
	}
}

class Port {
	constructor(type) {
		this.type = type;
		this.resources = {};
		this.buy_prices = {};
		this.sell_prices = {};
		this.strength = 0;
		this.created_resources = {};
	}
}

var PortType = Object.freeze({ Stardock: 0, FarmingPort: 1, ManufacturingPort: 2, MiningPort: 3 });

class Sector {
	constructor(name, routes, warps) {
		this.name = name;
		this.routes = routes;
		this.warps = warps;
	}
}

class ShieldGenerator {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.rating = 0; // 0-1000
		this.mass = 0; // metric tons
		this.energy_for_full_regeneration = 0; // PN
		this.price = 0;
	}
}

class Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass_capacity = 0; // metric tons
		this.volume_capacity = 0; // cu meters
		this.energy_capacity = 0; // PN
		this.energy_production = 0; // PN/hour
		this.energy_per_move = 0; // PN
		this.price = 0;
		this.equipment = {}; // warp drive, stealth drive,
		this.shields = null; // ShieldGenerator class?
		this.armor = null; // Armor class?
	}
}

class World {
	constructor(name, sectors, ports, stardock_location, players, chat_log) {
		this.name = name;
		this.sectors = sectors;
		this.ports = ports;
		this.stardock_location = stardock_location;
		this.players = players;
		this.chat_log = chat_log;
	}
}

// Ports
class FarmingPort extends Port {
	constructor() {
		super(PortType.FarmingPort);
	}
}

class ManufacturingPort extends Port {
	constructor() {
		super(PortType.ManufacturingPort);
	}
}

class MiningPort extends Port {
	constructor() {
		super(PortType.MiningPort);
	}
}

class Stardock extends Port {
	constructor() {
		super(PortType.Stardock);
	}
}
