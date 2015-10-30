'use strict';

// Ships
class IronClad extends Ship {
	constructor() {
		super();
		this.name = "Iron Clad";
		this.description = "heavly armored with huge stoage capacity the Iron Clad is built for flying right through the enemy";
		this.drive = new BasicIonDrive(); // ion/warp drive
		this.generator = new BasicNuclearReactor(); // solar panels/nuclear, etc
		this.manufacturer = "Fortuna";
		this.mass = 7500;
		this.mass_capacity = 1200; // kg
		this.volume_capacity = 5000; // cu meters
		this.energy_capacity = 750; // PN
		this.price = 2000;
		this.equipment = []; // warp drive, stealth drive,
		this.shields = new SteelBubble(); // ShieldGenerator class?
		this.armor = new PaladiumArmor(); // Armor class?
	}
}
class Trireme extends Ship {
	constructor() {
		super();
		this.name = "Trireme";
		this.description = "Your basic run of the mill ship (found in an abandoned warehouse)";
		this.drive = new BasicIonDrive(); // ion/warp drive
		this.generator = new BasicSolarPanels(); // solar panels/nuclear, etc
		this.manufacturer = "Navire Ships";
		this.mass = 5000;
		this.mass_capacity = 500; // kg
		this.volume_capacity = 5000; // cu meters
		this.energy_capacity = 750; // PN
		this.price = 1000;
		this.equipment = []; // warp drive, stealth drive,
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new AluminiumArmor(); // Armor class?
	}
}

class TutorialShip extends Ship {
	constructor() {
		super();
		this.name = "Tutorial Ship";
		this.description = "Masters have to start somewhere.";
		this.drive = new BasicIonDrive(); // ion/warp drive
		this.generator = null; // solar panels/nuclear, etc
		this.manufacturer = "Kinderschiffs";
		this.mass = 250;
		this.mass_capacity = 500; // kg
		this.volume_capacity = 2500; // cu meters
		this.energy_capacity = 100; // PN
		this.drive = new BasicIonDrive();
		this.generator = new BasicSolarPanels();
		this.equipment = []; // warp drive, stealth drive,
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new AluminiumArmor(); // Armor class?
	}
}