'use strict';

//Drives
class IonDrive extends Drive {
	constructor() {
		super();
		this.name = "Ion Drive";
		this.description = "Take you places at a normal pace";
		this.manufacturer = "Basic Metals Inc.";
		this.volume = 10;
		this.mass = 0;
		this.energy_per_use = 1; // PN
		this.price = 0;
	}
}

//Generators

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
		this.mass_factor = 0.5;
		this.rating = 75; // 0-1000
		this.price = 350;
	}
}
//Equipment
