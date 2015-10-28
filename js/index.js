/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals easygui, notification, logging, server*/
"use strict";

function setPageTitle(title) {
	if (title) {
		document.title = title + ' - Deep Space';
	} else {
		document.title = 'Deep Space';
	}
}

function joinWorldSuccess(data) {
		// Try to load the world now that you've joined it
		server.worldView(data.token, loadWorldSuccess, loadWorldFailure);
}

function joinWorldFailure() {
	notification.danger('Could not join you to world');
}

function loadWorldSuccess(data) {
	notification.info('Loaded world: ' + data.world.name);
	window.world = data.world;
	setPageTitle(data.world.name);
	showPlayView();
	viewSector();
}

function loadWorldFailure() {
	notification.danger('Could not find world to load it');
}

function loadWorldsSuccess(worlds) {
	// Loads the list of worlds in the lobby
	$('.js__lobby__world-table tr:gt(1)').remove();
	var $clone = $('#js__lobby__row-template').clone().attr('id', '').show();

	for (var i = 0; i < worlds.length; i++) {
		var $row = $clone.clone();
		$row.find('.js__lobby__row-template-world').text(worlds[i].name);
		$row.find('.js__lobby__row-template-players').text('???');
		$row.find('.js__lobby__row-template-action').data('token', worlds[i].token);
		$('.js__lobby__world-table > tbody:last-child').append($row);
	}

	$('.js__lobby__row-template-action').on('click', function() {
		var token = $(this).data('token');
		server.worldView(token, loadWorldSuccess, loadWorldFailure);
	});
}

function createNewWorldFailure() {
	notification.danger("Could not create world.  Check to make sure the name isn't already taken.");
}

function createNewWorldSuccess(data) {
	notification.info('Created new world: ' + data.name);
	server.worldJoin(data.token, window.user.token, joinWorldSuccess, joinWorldFailure);
}

function reloadWorldView() {
	server.worldView(world.token, function (data) {
		window.world = data.world;
		setPageTitle(data.world.name);
		showPlayView();
		viewSector();
	}, function () {
		notification.warning('Something went wrong and we couldn\'t refresh the page.');
	});
}

function playerMoveToSuccess() {
	reloadWorldView();
}

function playerMoveToFailure() {
	notification.warning('Something went wrong during that move');
}

function signInSubmit() {
	server.userAuthenticate($('.js__signin__email').val(), $('.js__signin__password').val(), signInSuccess, signInFailure);
	return false;
}

function signInSuccess(data) {
	window.user = data;

	// Menu
	$('.js__nav__account-menu').show();
	$('.js__nav__profile-name').text(data.email);
	$('.js__nav__profile-image').attr('src', data.avatar);
	if (true) {
		$('.js__nav__admin-menu').show();
	} else {
		$('.js__nav__admin-menu').hide();
	}

	showLobbyView();
}

function signInFailure() {
	notification.danger('Sign in failed');
}

function forgotSubmit() {
	server.userForgotPassword($('.js__forgot__email').val(), showSignIn, function() {
		notification.danger('Error while attempting to send password reset');
	});
	return false;
}

function signOutSubmit() {
	server.userSignOut(signOutSuccess);
	return false;
}

function signOutSuccess() {
	window.user = null;

	$('.js__nav__account-menu').hide();
	$('.js__nav__admin-menu').hide();
	showWelcomeView();
	showSignIn();
}

function signUpSubmit() {
	server.userSignUp($('.js__signup__email').val(), $('.js__signup__password').val(), signUpSuccess, function() {
		notification.danger('Failed to sign up');
	});
	return false;
}

function signUpSuccess(data) {
	signInSuccess(data);
	return false;
}

function showWelcomeView() {
	setPageTitle('Welcome');
	$('.js__main').children().hide();
	$('.js__welcome').show();
	return false;
}

function showLobbyView() {
	setPageTitle('Lobby');
	$('.js__main').children().hide();
	$('.js__lobby').show();
	$('.js__lobby__create-world').on('click', function () {
		easygui.inputBox("What do you want to name your world", "Create New World", null, "example: Phobos", function (name) {
			if (!name) {
				return;
			}

			server.worldCreate(name, null, createNewWorldSuccess, createNewWorldFailure);
		});
	});

	server.worldList(loadWorldsSuccess);
	return false;
}

function viewSector() {
	$('.js__play').children().hide();

	var world = window.world;
	// TODO: Actually get these values
	var playerLocation = world.players[window.user.token].location;
	var sector = world.sectors[playerLocation];
	var port = world.ports[playerLocation];
	var planet = null; //world.planets[playerLocation];

	var hasWarpDrive = true;
	var hasWarps = !!sector.warps;
	var energyRemaining = 1000;
	var hasPort = !!port;
	var hasPlanet = false;

	$('.js__play__sector-number').text(playerLocation);
	$('.js__play__sector-name').text(sector.name);

	if (hasPort) {
		$('.js__play__port-tray').text('There is a ' + port.type + ' port here');
	}
	$('.js__play__port-tray').toggle(hasPort);

	if (hasPlanet) {
		$('.js__play__planet-tray').text('There is a planet here');
	}
	$('.js__play__planet-tray').toggle(hasPlanet);

	$('.js__play__move-tray').empty();
	for (var route of sector.routes) {
		var $moveButton = $('<button class="btn js__play__move-button">').text(route).data('sector', route);
		$('.js__play__move-tray').append($moveButton);
	}
	$('.js__play__move-button').on('click', function () {
		var sector = $(this).data('sector');
		server.playerMoveTo(world.token, user.token, sector, playerMoveToSuccess, playerMoveToFailure);
	});

	if (hasWarps && hasWarpDrive) {
		$('.js__play__warp-tray').text(sector.warps);
	}
	$('.js__play__warp-tray').toggle(hasWarps && hasWarpDrive);

	// Show the whole view
	$('.js__play__sector').show();
}

function showPlayView() {
	$('.js__main').children().hide();
	$('.js__play').show();
	return false;
}

function showForgotPassword() {
	$('.js__signin').hide();
	$('.js__forgot').show();
	$('.js__signup').hide();
	return false;
}

function showSignIn() {
	$('.js__signin').show();
	$('.js__forgot').hide();
	$('.js__signup').hide();
	return false;
}

function showSignUp() {
	$('.js__signin').hide();
	$('.js__forgot').hide();
	$('.js__signup').show();
	return false;
}

$(function () {
	showWelcomeView();

	// Sign in forms
	$('.js__signin__form').on('submit', signInSubmit);
	$('.js__signin__forgot-password-link').on('click', showForgotPassword);
	$('.js__signin__signup-link').on('click', showSignUp);
	$('.js__forgot__signin-link').on('click', showSignIn);
	$('.js__signup__signin-link').on('click', showSignIn);
	$('.js__forgot__form').on('submit', forgotSubmit);
	$('.js__signup__form').on('submit', signUpSubmit);

	// Nav menu
	$('.js__nav__lobby').on('click', function() { showLobbyView(); return true;});
	$('.js__nav__signout').on('click', signOutSubmit);
	$('.js__nav__toggle-log').on('click', logging.toggle);
	$('.js__nav__clear-storage').on('click', function () {
		server.adminStorageClear(function() {
			logging.info("Cleared storage");
			notification.info('Storage cleared');
		});
	});
});
