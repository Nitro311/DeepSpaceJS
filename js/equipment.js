/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*global Drive, Armor, Equipment, Generator, ShieldGenerator*/
'use strict';

//Drives
function BasicIonDrive () {
	Drive.call(this);
	this.name = "Basic Ion Drive";
	this.description = "Take you places at a normal pace";
	this.manufacturer = "Pamata Metals Inc.";
	this.volume = 10;
	this.mass = 20;
	this.price = 100;
	this.thrust = 1000; //Horse Power
}
BasicIonDrive.prototype = Object.create(Drive.prototype);
BasicIonDrive.prototype.constructor = BasicIonDrive;

function BasicWarpDrive () {
	Drive.call(this);
	this.name = "Basic Warp Drive";
	this.description = "Can use warps to create wormholes through space, all you need to do to find them";
	this.manufacturer = "Universal Space Administration";
	this.volume = 10;
	this.mass = 10;
	this.price = 300;
	this.thrust = 1000; //Horse Power
}
BasicWarpDrive.prototype = Object.create(Drive.prototype);
BasicWarpDrive.prototype.constructor = BasicWarpDrive;

function BasicTransWarpDrive () {
	Drive.call(this);
	this.name = "Basic Trans-Warp Drive";
	this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them";
	this.manufacturer = "Universal Space Administration";
	this.volume = 10;
	this.mass = 15;
	this.price = 1000;
	this.thrust = 1000; //Horse Power
}
BasicTransWarpDrive.prototype = Object.create(Drive.prototype);
BasicTransWarpDrive.prototype.constructor = BasicTransWarpDrive;

function QuickTransWarpDrive () {
	Drive.call(this);
	this.name = "Quick Trans-Warp Drive";
	this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them";
	this.manufacturer = "Universal Space Administration";
	this.volume = 10;
	this.mass = 20;
	this.price = 2000;
	this.thrust = 500; //Horse Power
}
QuickTransWarpDrive.prototype = Object.create(Drive.prototype);
QuickTransWarpDrive.prototype.constructor = QuickTransWarpDrive;

function QuickIonDrive () {
	Drive.call(this);
	this.name = "Quick Ion Drive";
	this.description = "Take you places at a normal pace";
	this.manufacturer = "Pamata Metals Inc.";
	this.volume = 15;
	this.mass = 25;
	this.price = 250;
	this.thrust = 500; //Horse Power
}
QuickIonDrive.prototype = Object.create(Drive.prototype);
QuickIonDrive.prototype.constructor = QuickIonDrive;

function QuickWarpDrive () {
	Drive.call(this);
	this.name = "Quick Warp Drive";
	this.description = "Can use warps to create wormholes through space, all you need to do to find them";
	this.manufacturer = "Universal Space Administration";
	this.volume = 20;
	this.mass = 30;
	this.price = 500;
	this.thrust = 500; //Horse Power
}
QuickWarpDrive.prototype = Object.create(Drive.prototype);
QuickWarpDrive.prototype.constructor = QuickWarpDrive;

function QuickTransWarpDrive () {
	Drive.call(this);
	this.name = "Quick Trans-Warp Drive";
	this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them";
	this.manufacturer = "Universal Space Administration";
	this.volume = 15;
	this.mass = 20;
	this.price = 2000;
	this.thrust = 500; //Horse Power
}
QuickTransWarpDrive.prototype = Object.create(Drive.prototype);
QuickTransWarpDrive.prototype.constructor = QuickTransWarpDrive;

function RobustIonDrive () {
	Drive.call(this);
	this.name = "Robust Ion Drive";
	this.description = "Take you places at a normal pace.  (The robust model is more efficent for larger craft.)";
	this.manufacturer = "Pamata Metals Inc.";
	this.volume = 250;
	this.mass = 300;
	this.price = 250;
	this.thrust = 2000; //Horse Power
}
RobustIonDrive.prototype = Object.create(Drive.prototype);
RobustIonDrive.prototype.constructor = RobustIonDrive;

function RobustWarpDrive () {
	Drive.call(this);
	this.name = "Robust Warp Drive";
	this.description = "Can use warps to create wormholes through space, all you need to do to find them. The robust model is more efficent for larger craft.)";
	this.manufacturer = "Universal Space Administration";
	this.volume = 400;
	this.mass = 300;
	this.price = 500;
	this.thrust = 2000; //Horse Power
}
RobustWarpDrive.prototype = Object.create(Drive.prototype);
RobustWarpDrive.prototype.constructor = RobustWarpDrive;

function RobustTransWarpDrive () {
	Drive.call(this);
	this.name = "Quick Trans-Warp Drive";
	this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them. (The robust model is more efficent for larger craft)";
	this.manufacturer = "Universal Space Administration";
	this.volume = 300;
	this.mass = 250;
	this.price = 2000;
	this.thrust = 2000; //Horse Power
}
RobustTransWarpDrive.prototype = Object.create(Drive.prototype);
RobustTransWarpDrive.prototype.constructor = RobustTransWarpDrive;
		
//Generators
function BasicSolarPanels () {
	Generator.call(this);
	this.name = 'Basic Solar Panels';
	this.description = 'you have to get energy from somewhere';
	this.manufacturer = 'Eguzki Energy';
	this.energy_production = 4; //PN/hr
	this.volume = 0;//outdoors
	this.mass = 10;
	this.price = 150;
}
BasicSolarPanels.prototype = Object.create(Generator.prototype);
BasicSolarPanels.prototype.constructor = BasicSolarPanels;

function BasicNuclearReactor () {
	Generator.call(this);
	this.name = 'Basic Nuclear Reactor';
	this.description = 'creates energy with split atoms';
	this.manufacturer = 'Eguzki Energy';
	this.energy_production = 9; //PN/hr
	this.volume = 1000;
	this.mass = 1500;
	this.price = 250;
}
BasicNuclearReactor.prototype = Object.create(Generator.prototype);
BasicNuclearReactor.prototype.constructor = BasicNuclearReactor;

//Shields
function BasicBubble () {
	ShieldGenerator.call(this);
	this.name = "The Basic Bubble";
	this.description = "for all your basic shield generator needs";
	this.manufacturer = "Universal Space Adminstration";
	this.rating = 50; // 0-1000
	this.mass = 0.25; // metric tons
	this.energy_for_full_regeneration = 10; // PN
	this.price = 250;
}
BasicBubble.prototype = Object.create(ShieldGenerator.prototype);
BasicBubble.prototype.constructor = BasicBubble;

function SteelBubble () {
	ShieldGenerator.call(this);
	this.name = "The Steel Bubble";
	this.description = "a strong but flexible bubble of electrifyed steel gas";
	this.manufacturer = "Universal Space Adminstration";
	this.rating = 120; // 0-1000
	this.mass = 1.5; // metric tons
	this.energy_for_full_regeneration = 30; // PN
	this.price = 355;
}
SteelBubble.prototype = Object.create(ShieldGenerator.prototype);
SteelBubble.prototype.constructor = SteelBubble;

//Armor
function AluminiumArmor () {
	Armor.call(this);
	this.name = "Aluminium Armor";
	this.description = "Light and some what Durable";
	this.manufacturer = "Pret Metals Inc.";
	this.mass_factor = 0.5;
	this.rating = 75; // 0-1000
	this.price = 350;
}
AluminiumArmor.prototype = Object.create(Armor.prototype);
AluminiumArmor.prototype.constructor = AluminiumArmor;

function PaladiumArmor () {
	Armor.call(this);
	this.name = "Paladium Armor";
	this.description = "Heavy, Heat Resistant, and Durable";
	this.manufacturer = "Qawi Metals Inc.";
	this.mass_factor = 3.5;
	this.rating = 125; // 0-1000
	this.price = 500;
}
PaladiumArmor.prototype = Object.create(Armor.prototype);
PaladiumArmor.prototype.constructor = PaladiumArmor;

function Magnisum_I_SteelArmor () {
	Armor.call(this);
	this.name = "Magnisum-Infused-Steel Armor";
	this.description = "Heavy, Strong, and Magnetic";
	this.manufacturer = "Toplo Metals Inc.";
	this.mass_factor = 2;
	this.rating = 110; // 0-1000
	this.price = 390;
}
Magnisum_I_SteelArmor.prototype = Object.create(Armor.prototype);
Magnisum_I_SteelArmor.prototype.constructor = Magnisum_I_SteelArmor;

//Equipment
function StealthDrive () {
	Equipment.call(this);
	this.name = 'Stealth Drive';
	this.description = 'for all your invisiblity needs (hides you for one sector when activated)';
	this.manufacturer = 'Universal Space Administration';
	this.volume = 40;
	this.mass = 60;
	this.energy_per_use = 3; // PN
	this.price = 550;
}
StealthDrive.prototype = Object.create(Equipment.prototype);
StealthDrive.prototype.constructor = StealthDrive;
