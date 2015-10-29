'use strict';

// Ships
class Trireme extends Ship {
	constructor() {
		super();
		this.name = "Trireme";
		this.description = "Your basic run of the mill ship (found in an abandoned warehouse)";
		this.manufacturer = "Unknown";
		this.mass = 5000;
		this.mass_capacity = 500; // kg
		this.volume_capacity = 5000; // cu meters
		this.energy_capacity = 750; // PN
		this.price = 1000;
		this.equipment = [new WarpDrive()]; // warp drive, stealth drive,
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new Aluminium(); // Armor class?
	}
}

class TutorialShip extends Ship {
	constructor() {
		super();
		this.name = "Tutorial Ship";
		this.description = "Masters have to start somewhere.";
		this.manufacturer = "Kinderschiff";
		this.mass = 250;
		this.mass_capacity = 500; // kg
		this.volume_capacity = 2500; // cu meters
		this.energy_capacity = 100; // PN
		this.drive = new Drive();
		this.generator = new Generator();
		this.equipment = [new WarpDrive()]; // warp drive, stealth drive,
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new Aluminium(); // Armor class?
	}
}
