/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported IronClad, Trireme, TutorialShip*/
/*global Ship*/
'use strict';

// Ships
function IronClad () {
	Ship.call(this);
	this.name = "Iron Clad";
	this.description = "Heavily-armored with huge storage capacity the Iron Clad is built for flying right through the enemy";
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
IronClad.prototype = Object.create(Ship.prototype);
IronClad.prototype.constructor = IronClad;

function Trireme () {
	Ship.call(this);
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
Trireme.prototype = Object.create(Ship.prototype);
Trireme.prototype.constructor = Trireme;

function TutorialShip () {
	Ship.call(this);
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
TutorialShip.prototype = Object.create(Ship.prototype);
TutorialShip.prototype.constructor = TutorialShip;
