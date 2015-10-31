'use strict';

// Ship frames
class Scout extends Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 300; // kg
		this.mass_capacity = 400; // kg
		this.volume_capacity = 1000; // cu meters
		this.energy_capacity = 600; // PN
		this.price = 1750;
		this.drive = new QuickIonDrive(); // ion/warp drive
		this.generator = new MiniNuclearReactor(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new AluminiumArmor(); // Armor class?
	}
}
class Corvette extends Ship{
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 400; // kg
		this.mass_capacity = 500; // kg
		this.volume_capacity = 1500; // cu meters
		this.energy_capacity = 610; // PN
		this.price = 1100;
		this.drive = new QuickIonDrive(); // ion/warp drive
		this.generator = new MiniNuclearReactor(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new AluminiumArmor(); // Armor class?
	}
}
class Cruiser extends Ship{
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 850; // kg
		this.mass_capacity = 750; // kg
		this.volume_capacity = 5000; // cu meters
		this.energy_capacity = 650; // PN
		this.price = 1000;
		this.drive = new QuickIonDrive(); // ion/warp drive
		this.generator = new BasicSolarPanels(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new SteelBubble(); // ShieldGenerator class?
		this.armor = new AluminiumArmor(); // Armor class?
	}
}
class Frigate extends Ship{
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 630; // kg
		this.mass_capacity = 750; // kg
		this.volume_capacity = 2000; // cu meters
		this.energy_capacity = 650; // PN
		this.price = 2000;
		this.drive = new QuickIonDrive(); // ion/warp drive
		this.generator = new BasicSolarPanels(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new BasicBubble(); // ShieldGenerator class?
		this.armor = new Magnisum_I_SteelArmor(); // Armor class?
	}
}
class Destroyers extends Ship{
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 800; // kg
		this.mass_capacity = 1000; // kg
		this.volume_capacity = 4000; // cu meters
		this.energy_capacity = 650; // PN
		this.price = 3000;
		this.drive = new BasicIonDrive(); // ion/warp drive
		this.generator = new BasicSolarPanels(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new SteelBubble(); // ShieldGenerator class?
		this.armor = new PalladiumArmor(); // Armor class?
	}
}

class BattleCruiser extends Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 3000; // kg
		this.mass_capacity = 1000; // kg
		this.volume_capacity = 6000; // cu meters
		this.energy_capacity = 790; // PN
		this.price = 5000;
		this.drive = new RobustIonDrive(); // ion/warp drive
		this.generator = new AdvancedNuclearReactor(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new SteelBubble(); // ShieldGenerator class?
		this.armor = new CarbonCarbideArmor(); // Armor class?
	}
}
class Carrier extends Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 6000; // kg
		this.mass_capacity = 3000; // kg
		this.volume_capacity = 6000; // cu meters
		this.energy_capacity = 800; // PN
		this.price = 8000;
		this.drive = new ExtremelyRobustIonDrive(); // ion/warp drive
		this.generator = new AdvancedNuclearReactor(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new QuantumBubble(); // ShieldGenerator class?
		this.armor = new CarbonCarbideArmor(); // Armor class?
	}
}
class Dreadnought extends Ship {
	constructor() {
		this.name = '';
		this.description = '';
		this.manufacturer = '';
		this.mass = 8000; // kg
		this.mass_capacity = 7000; // kg
		this.volume_capacity = 8000; // cu meters
		this.energy_capacity = 800; // PN
		this.price = 10000;
		this.drive = new ExtremelyRobustIonDrive(); // ion/warp drive
		this.generator = new AdvancedNuclearReactor(); // solar panels/nuclear, etc
		this.equipment = {}; // stealth generator
		this.shields = new QuantumBubble(); // ShieldGenerator class?
		this.armor = new CarbonCarbideArmor(); // Armor class?
	}
}
