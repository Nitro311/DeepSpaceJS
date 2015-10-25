"use strict";

class Ship {
	constructor() {
		this.name = "";
		this.description = "";
		this.manufacturer = "";
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
};

class Equipment {
	constructor() {
		this.name = "";
		this.description = "";
		this.manufacturer = "";
		this.volume = 0;
		this.mass = 0;
		this.energy_per_use = 0; // PN
		this.ability = "";
		this.price = 0;
	}
};

class ShieldGenerator {
	constructor() {
		this.name = "";
		this.description = "";
		this.manufacturer = "";
		this.rating = 0; // 0-1000
		this.mass = 0; // metric tons
		this.energy_for_full_regeneration = 0; // PN
		this.price = 0;
	}
};

class Armor {
	constructor() {
		this.name = "";
		this.description = "";
		this.manufacturer = "";
		this.rating = 0; // 0-1000
		this.price = 0;
	}
};

class Trireme extends Ship {
	constructor() {
		super();
		this.name = "Trireme";
		this.description = "";
		this.manufacturer = "";
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
};
