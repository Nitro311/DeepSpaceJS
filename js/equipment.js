'use strict';

//Drives
class BasicIonDrive extends Drive {
	constructor() {
		super();
		this.name = "Basic Ion Drive";
		this.description = "Take you places at a normal pace";
		this.manufacturer = "Pamata Metals Inc.";
		this.volume = 10;
		this.mass = 20;
		this.price = 100;
		this.thrust = 1000; //Horse Power
	}
}
class BasicWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Basic Warp Drive";
		this.description = "Can use warps to create wormholes through space, all you need to do to find them";
		this.manufacturer = "Universal Space Administration";
		this.volume = 10;
		this.mass = 10;
		this.price = 300;
		this.thrust = 1000; //Horse Power
	}
}
class BasicTrasWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Basic Trans-Warp Drive";
		this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them";
		this.manufacturer = "Universal Space Administration";
		this.volume = 10;
		this.mass = 15;
		this.price = 1000;
		this.thrust = 1000; //Horse Power
	}
}
class QuickTrasWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Quick Trans-Warp Drive";
		this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them";
		this.manufacturer = "Universal Space Administration";
		this.volume = 10;
		this.mass = 20;
		this.price = 2000;
		this.thrust = 500; //Horse Power
	}
}
class QuickIonDrive extends Drive {
	constructor() {
		super();
		this.name = "Quick Ion Drive";
		this.description = "Take you places at a normal pace";
		this.manufacturer = "Pamata Metals Inc.";
		this.volume = 15;
		this.mass = 25;
		this.price = 250;
		this.thrust = 500; //Horse Power
	}
}
class QuickWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Quick Warp Drive";
		this.description = "Can use warps to create wormholes through space, all you need to do to find them";
		this.manufacturer = "Universal Space Administration";
		this.volume = 20;
		this.mass = 30;
		this.price = 500;
		this.thrust = 500; //Horse Power
	}
}
class QuickTrasWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Quick Trans-Warp Drive";
		this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them";
		this.manufacturer = "Universal Space Administration";
		this.volume = 15;
		this.mass = 20;
		this.price = 2000;
		this.thrust = 500; //Horse Power
class RobustIonDrive extends Drive {
	constructor() {
		super();
		this.name = "Robust Ion Drive";
		this.description = "Take you places at a normal pace.  (The robust model is more efficent for larger craft.)";
		this.manufacturer = "Pamata Metals Inc.";
		this.volume = 250;
		this.mass = 300;
		this.price = 250;
		this.thrust = 2000; //Horse Power
	}
}
class RobustWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Robust Warp Drive";
		this.description = "Can use warps to create wormholes through space, all you need to do to find them. The robust model is more efficent for larger craft.)";
		this.manufacturer = "Universal Space Administration";
		this.volume = 400;
		this.mass = 300;
		this.price = 500;
		this.thrust = 2000; //Horse Power
	}
}
class RobustTrasWarpDrive extends Drive {
	constructor() {
		super();
		this.name = "Quick Trans-Warp Drive";
		this.description = "Can instantly teleport to the stardock for no energy and Can use warps to create wormholes through space, all you need to do to find them. (The robust model is more efficent for larger craft)";
		this.manufacturer = "Universal Space Administration";
		this.volume = 300;
		this.mass = 250;
		this.price = 2000;
		this.thrust = 2000; //Horse Power
//Generators
class BasicSolarPanels extends Generator {
	constructor() {
		this.name = 'Basic Solar Panels';
		this.description = 'you have to get energy from somewhere';
		this.manufacturer = 'Eguzki Energy';
		this.energy_production = 4; //PN/hr
		this.volume = 0;//outdoors
		this.mass = 10;
		this.price = 150;
	}
}
class BasicNuclearReactor extends Generator {
	constructor() {
		this.name = 'Basic Nuclear Reactor';
		this.description = 'creates energy with split atoms';
		this.manufacturer = 'Eguzki Energy';
		this.energy_production = 9; //PN/hr
		this.volume = 1000;
		this.mass = 1500;
		this.price = 250;
	}
}
//Shields
class BasicBubble extends ShieldGenerator{
	constructor(){
		super();
		this.name = "The Basic Bubble";
		this.description = "for all your basic shield generator needs";
		this.manufacturer = "Universal Space Adminstration";
		this.rating = 50; // 0-1000
		this.mass = 0.25; // metric tons
		this.energy_for_full_regeneration = 10; // PN
		this.price = 250;
	}
}
class SteelBubble extends ShieldGenerator{
	constructor(){
		super();
		this.name = "The Steel Bubble";
		this.description = "a strong but flexible bubble of electrifyed steel gas";
		this.manufacturer = "Universal Space Adminstration";
		this.rating = 120; // 0-1000
		this.mass = 1.5; // metric tons
		this.energy_for_full_regeneration = 30; // PN
		this.price = 355;
	}
}
//Armor
class AluminiumArmor extends Armor {
	constructor() {
		super();
		this.name = "Aluminium Armor";
		this.description = "Light and some what Durable";
		this.manufacturer = "Pret Metals Inc.";
		this.mass_factor = 0.5;
		this.rating = 75; // 0-1000
		this.price = 350;
	}
}
class PaladiumArmor extends Armor {
	constructor() {
		super();
		this.name = "Paladium Armor";
		this.description = "Heavy, Heat Resistant, and Durable";
		this.manufacturer = "Qawi Metals Inc.";
		this.mass_factor = 3.5;
		this.rating = 125; // 0-1000
		this.price = 500;
	}
}
class Magnisum_I_SteelArmor extends Armor {
	constructor() {
		super();
		this.name = "Magnisum-Infused-Steel Armor";
		this.description = "Heavy, Strong, and Magnetic";
		this.manufacturer = "Toplo Metals Inc.";
		this.mass_factor = 2;
		this.rating = 110; // 0-1000
		this.price = 390;
	}
}
//Equipment
class StealthDrive extends Equipment {
	constructor() {
		this.name = 'Stealth Drive';
		this.description = 'for all your invisiblity needs (hides you for one sector when activated)';
		this.manufacturer = 'Universal Space Administration';
		this.volume = 40;
		this.mass = 60;
		this.energy_per_use = 3; // PN
		this.price = 550;
	}
}