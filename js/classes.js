/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported Area, Armor, Equipment, Player, Port, Sector, ShieldGenerator, Ship, World, FarmingPort, ManufacturingPort, MiningPort, StarDock*/
/*global PortType*/
'use strict';

// Basic domain classes, extended in other places
var Area = Object.freeze({Space: 0, Port: 1, Planet: 2});

function Armor () {
	this.name = '';
	this.description = '';
	this.manufacturer = '';
	this.mass_factor = 1;
	this.rating = 0; // 0-1000
	this.price = 0;
}

function Drive () {
	this.name = '';
	this.description = '';
	this.thrust = 0 ; //Horse Power
	this.manufacturer = '';
	this.volume = 10;
	this.mass = 0;
	this.energy_per_use = 1; // PN
	this.price = 0;
}

function Equipment () {
	this.name = '';
	this.description = '';
	this.manufacturer = '';
	this.volume = 0;
	this.mass = 0;
	this.energy_per_use = 0; // PN
	this.price = 0;
}

function Generator () {
	this.name = '';
	this.description = '';
	this.manufacturer = '';
	this.energy_production = 0; //PN/hr
	this.volume = 0;
	this.mass = 0;
	this.price = 0;
}

function Player () {
	this.name = '';
	this.gold_coins = 0;
	this.ship = null;
	this.location = 0;
	this.area = Area.Space;
}

function Port (type) {
	this.type = type;
	this.resources = {};
	this.buy_prices = {};
	this.sell_prices = {};
	this.strength = 0;
	this.created_resources = {};
}

function Sector (name, routes, warps) {
	this.name = name;
	this.routes = routes;
	this.warps = warps;
}

function ShieldGenerator () {
	this.name = '';
	this.description = '';
	this.manufacturer = '';
	this.rating = 0; // 0-1000
	this.mass = 0; // metric tons
	this.energy_for_full_regeneration = 0; // PN
	this.price = 0;
}

function Ship () {
	this.name = '';
	this.description = '';
	this.manufacturer = '';
	this.mass = 0; // kg
	this.mass_capacity = 0; // kg
	this.volume_capacity = 0; // cu meters
	this.energy_capacity = 0; // PN
	this.price = 0;
	this.drive = null; // ion/warp drive
	this.generator = null; // solar panels/nuclear, etc
	this.equipment = {}; // stealth generator
	this.shields = null; // ShieldGenerator class?
	this.armor = null; // Armor class?
}

Ship.prototype.energyPerMove = function () {
	var mass = this.mass + this.drive.mass + this.generator.mass + this.shield.mass + this.armor.mass;
	for (var e of this.equipment) {
		mass += e.mass;
	}
	return mass / this.drive.thrust;
};

function World (name, token, sectors, ports, players, chat_log) {
	this.name = name;
	this.token = token;
	this.sectors = sectors;
	this.ports = ports;
	this.players = players;
	this.chat_log = chat_log;
	this.stardock_location = null;

	for (var sector of Object.keys(ports)) {
		if (ports[sector].type === PortType.Stardock) {
			this.stardock_location = sector;
			break;
		}
	}
}

// Ports
var PortType = Object.freeze({
	Stardock: 'Stardock',
	FarmingPort: 'FarmingPort',
	ManufacturingPort: 'ManufacturingPort',
	MiningPort: 'MiningPort'
});

function FarmingPort () {
	Port.call(this, PortType.FarmingPort);
}
FarmingPort.prototype = Object.create(Port.prototype);
FarmingPort.prototype.constructor = FarmingPort;

function ManufacturingPort () {
	Port.call(this, PortType.ManufacturingPort);
}
ManufacturingPort.prototype = Object.create(Port.prototype);
ManufacturingPort.prototype.constructor = ManufacturingPort;

function MiningPort () {
	Port.call(this, PortType.MiningPort);
}
MiningPort.prototype = Object.create(Port.prototype);
MiningPort.prototype.constructor = MiningPort;

function Stardock () {
	Port.call(this, PortType.Stardock);
}
Stardock.prototype = Object.create(Port.prototype);
Stardock.prototype.constructor = Stardock;
