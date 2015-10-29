'use strict';

// Ships
class Trireme extends Ship {
	constructor() {
		super();
		this.name = "Trireme";
		this.description = "Your basic run of the mill ship (found in an abandoned warehouse)";
		this.manufacturer = "Unknown";
		this.mass_capacity = 0.5; // metric tons
		this.volume_capacity = 5000; // cu meters
		this.energy_capacity = 750; // PN
		this.energy_production = 5; // PN/hour
		this.energy_per_move = 1; // PN
		this.price = 1000;
		this.equipment = [new WarpDrive()]; // warp drive, stealth drive,
		this.shields = BasicBubble(); // ShieldGenerator class?
		this.armor = Aluminium; // Armor class?
	}
}

class TutorialShip extends Ship {
	constructor() {
		super();
		this.name = "Tutorial Ship";
		this.description = "Masters have to start somewhere.";
		this.manufacturer = "Unknown";
		this.mass_capacity = .1; // metric tons
		this.volume_capacity = 2500; // cu meters
		this.energy_capacity = 0; // PN
		this.energy_production = 0; // PN/hour
		this.energy_per_move = 0; // PN
		this.price = 0;
		this.equipment = [new WarpDrive()]; // warp drive, stealth drive,
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new Aluminium(); // Armor class?
	}
}

//Shields
class BasicBubble extends ShieldGenerator{
	constructor(){
		super();
		this.name = "The Basic Bubble";
		this.description = "for all your basic shield generator needs";
		this.manufacturer = "Unknown";
		this.rating = 50; // 0-1000
		this.mass = 0.25; // metric tons
		this.energy_for_full_regeneration = 10; // PN
		this.price = 250;
	}
}

//Armor
class Aluminium extends Armor {
	constructor() {
		super();
		this.name = "Aluminium Armor";
		this.description = "light and some what durable";
		this.manufacturer = "Basic Metals Inc.";
		this.rating = 75; // 0-1000
		this.price = 350;
	}
}
//Equipment
class BasicWarpDrive extends Equipment {
	constructor() {
		super();
		this.name = "Warp Drive";
		this.description = "Take you places at a normal pace";
		this.manufacturer = "Basic Metals Inc.";
		this.volume = 10;
		this.mass = 0;
		this.energy_per_use = 0; // PN
		this.ability = "";
		this.price = 0;
	}
}
