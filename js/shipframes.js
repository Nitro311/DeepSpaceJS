/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported Scout, Gunship*/
/*global Ship*/
'use strict';

// Ship frames
function Scout () {
	Ship.call(this);
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
Scout.prototype = Object.create(Ship.prototype);
Scout.prototype.constructor = Scout;

function Gunship () {
	Ship.call(this);
	this.name = '';
	this.description = '';
	this.manufacturer = '';
	this.mass = 3000; // kg
	this.mass_capacity = 500; // kg
	this.volume_capacity = 4500; // cu meters
	this.energy_capacity = 790; // PN
	this.price = 3000;
	this.drive = new RobustIonDrive(); // ion/warp drive
	this.generator = new BasicSolarPanels(); // solar panels/nuclear, etc
	this.equipment = {}; // stealth generator
	this.shields = new SteelBubble(); // ShieldGenerator class?
	this.armor = new PaladiumArmor(); // Armor class?
}
Gunship.prototype = Object.create(Ship.prototype);
Gunship.prototype.constructor = Gunship;
