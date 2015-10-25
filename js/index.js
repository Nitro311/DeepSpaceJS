"use strict";

$(function() {
	if ("") {
		$('#alertbar').show();
	}
	
	var world = World.load('Bertha');
	//new World('Bertha', null, null, null, [], null);
	
	//alert(world.players[0].name);
	//world.save();
	
	
	
	$('#star').click('on', function() {
		/*$(this).animate({
			'left': '-=30px',
			'top': '+=10px',
		});*/
		
	
		world.players[0].ship = new Trireme();
		
		world.save();
		
		var text = world.players[0].ship.name;
		
		$('.alertbar').text(text).finish().fadeIn().delay(4000).fadeOut();
	});
	
	$('.alertbar').click('on', function() {
		$('.alertbar').finish().fadeOut();
	});
	
	$('#clear-local-storage').click('on', function() {
		window.localStorage.clear();
		location.reload();
		return false;
	});
});

