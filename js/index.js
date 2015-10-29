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

function storageClearSuccess(response) {
	logging.info("Cleared storage");
	notification.info('Storage cleared');
	window.reload();
}

function storageClearFailure(response) {
	notification.danger('Error clearing storage ' + response.code);
}

function createWorldSuccess(response) {
	notification.info('Created world ' + response.name);
	server.send(queue.worldJoinRequest(response.token, window.user.token, joinWorldSuccess, joinWorldFailure));
}

function createWorldFailure() {
	notification.danger('Could not create your world');
}

function joinWorldSuccess(response) {
	window.world = response.world;
	window.player = response.player;
	reloadWorldView();
}

function joinWorldFailure() {
	notification.danger('Could not join you to world');
}

function loadWorldsSuccess(response) {
	var worlds = response.worlds;
	// Loads the list of worlds in the lobby
	$('.js__lobby__world-table tr:gt(1)').remove();
	var $clone = $('#js__lobby__row-template').clone().attr('id', '').show();

	for (var i = 0; i < worlds.length; i++) {
		var $row = $clone.clone();
		$row.find('.js__lobby__row-template-world').text(worlds[i].name);
		$row.find('.js__lobby__row-template-players').text(worlds[i].playerCount);
		$row.find('.js__lobby__row-template-action').data('token', worlds[i].token).text(worlds[i].isJoined ? "Play" : "Join");
		$('.js__lobby__world-table > tbody:last-child').append($row);
	}

	$('.js__lobby__row-template-action').on('click', function() {
		var token = $(this).data('token');
		server.send(queue.worldJoinRequest(token, window.user.token, joinWorldSuccess, joinWorldFailure));
	});
}

function reloadWorldView() {
	server.send(queue.playerViewSectorRequest(window.world.token, window.player.token, function (response) {
		window.world = response.world;
		window.player = response.player;
		setPageTitle(window.world.name);
		showPlayView();
		viewSector();
	}, function () {
		notification.warning('Something went wrong and we couldn\'t refresh the page.');
	}));
}

function playerMoveToSuccess(response) {
	reloadWorldView();
}

function playerMoveToFailure(response) {
	notification.warning('Something went wrong during that move');
}

function signInSubmit() {
	server.send(queue.userSignInRequest($('.js__signin__email').val(), $('.js__signin__password').val(), signInSuccess, signInFailure));
	return false;
}

function signInSuccess(response) {
	window.user = response.user;
	window.player = null;
	window.world = null;

	// Menu
	$('.js__nav__account-menu').show();
	$('.js__nav__profile-name').text(response.user.email);
	$('.js__nav__profile-image').attr('src', response.user.avatar);
	if (true) {
		$('.js__nav__admin-menu').show();
	} else {
		$('.js__nav__admin-menu').hide();
	}

	showLobbyView();
}

function signInFailure() {
	window.user = null;
	window.player = null;
	window.world = null;
	notification.danger('Sign in failed');
}

function forgotSubmit() {
	server.send(queue.userForgotPasswordRequest($('.js__forgot__email').val(), showSignIn, function() {
		notification.danger('Error while attempting to send password reset');
	}));
	return false;
}

function signOutSubmit() {
	server.send(queue.userSignOutRequest(window.user.token, signOutSuccess, function() {
		notification.danger('Error while signing out');
	}));
	return false;
}

function signOutSuccess(response) {
	window.user = null;
	window.player = null;
	window.world = null;

	$('.js__nav__account-menu').hide();
	$('.js__nav__admin-menu').hide();
	showWelcomeView();
	showSignIn();
}

function signUpSubmit() {
	server.send(queue.userSignUpRequest($('.js__signup__email').val(), $('.js__signup__password').val(), signUpSuccess, function() {
		notification.danger('Failed to sign up');
	}));
	return false;
}

function signUpSuccess(response) {
	signInSuccess(response);
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

			server.send(queue.worldCreateRequest(window.user.token, name, null, createWorldSuccess, createWorldFailure));
		});
	});

	server.send(queue.worldsGetRequest(window.user.token, loadWorldsSuccess));
	return false;
}

function viewSector() {
	$('.js__play').children().hide();

	// TODO: Actually get these values
	var playerLocation = window.world.players[window.user.token].location;
	var sector = window.world.sectors[playerLocation];
	var port = window.world.ports[playerLocation];
	var planet = null; //window.world.planets[playerLocation];

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
		server.send(queue.playerMoveToSectorRequest(window.world.token, window.user.token, sector, playerMoveToSuccess, playerMoveToFailure));
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
		server.send(queue.adminStorageClearRequest(window.user.token, storageClearSuccess, storageClearFailure));
	});
});
