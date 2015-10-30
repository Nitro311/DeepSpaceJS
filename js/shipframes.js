'use strict';

// Ship frames
class Scout extends Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 300; // kg
		this.mass_capacity = 100; // kg
		this.volume_capacity = 1000; // cu meters
		this.energy_capacity = 600; // PN
		this.price = 1000;
		this.drive = new QuickIonDrive(); // ion/warp drive
		this.generator = new BasicNuclearReactor(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new AluminiumArmor(); // Armor class?
	}
}
class Gunship extends Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 2000; // kg
		this.mass_capacity = 500; // kg
		this.volume_capacity = 4500; // cu meters
		this.energy_capacity = 790; // PN
		this.price = 3000;
		this.drive = null; // ion/warp drive
		this.generator = new BasicSolarPanels(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new SteelBubble(); // ShieldGenerator class?
		this.armor = new PaladiumArmor(); // Armor class?
	}
}