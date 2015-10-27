/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals easygui, notification, logging, server*/
"use strict";

function loadWorldSuccess(data) {
	notification.info('Loaded world: ' + data.world.name);
	window.world = data.world;
	showPlayView();
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
		$row.find('.js__lobby__row-template-world').text(worlds[i]);
		$row.find('.js__lobby__row-template-players').text('???');
		$row.find('.js__lobby__row-template-action').data('token', worlds[i]);
		$('.js__lobby__world-table > tbody:last-child').append($row);
	}

	$('.js__lobby__row-template-action').on('click', function() {
		var token = $(this).data('token');
		server.worldView(token, loadWorldSuccess, loadWorldFailure);
	});
}

function createNewWorldFailure() {
	notification.danger("Could not get create world");
}

function createNewWorldSuccess(data) {
	notification.info('Created new world: ' + data.name);
	server.worldView(data.token, loadWorldSuccess, loadWorldFailure);
}

function signInSubmit() {
	server.userAuthenticate($('.js__signin__email').val(), $('.js__signin__password').val(), signInSuccess, signInFailure);
	return false;
}

function signInSuccess(data) {
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
	$('.js__main').children().hide();
	$('.js__welcome').show();
	return false;
}

function showLobbyView() {
	$('.js__main').children().hide();
	$('.js__lobby').show();
	$('.js__lobby__create-world').on('click', function () {
		easygui.inputBox("What do you want to name your world", "Create New World", null, "example: Phobos", function (value) {
			if (!value) {
				return;
			}

			// TODO: Make a valid token
			var token = value;

			server.worldCreate(token, value, createNewWorldSuccess, createNewWorldFailure);
		});
	});

	server.worldList(loadWorldsSuccess);
	return false;
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
