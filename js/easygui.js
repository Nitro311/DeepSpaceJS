"use strict";

var easygui = (function ($) {
	var $askDiv = $('<div class="easygui">');

	$('body').append($askDiv);

	var askMultipleChoice = function (message, title, choices, onComplete) {
		var $buttonTray = $('<div class="easygui__button-tray">');
		var $titleBar = $('<div class="easygui__titlebar">');

		$titleBar.append($('<div class="easygui__title">').text(title));
		$titleBar.append($('<button class="easygui__close close">X</button>'));

		$askDiv
			.empty()
			.append($titleBar)
			.append($('<div class="easygui__message">').text(message))
			.append($buttonTray);

		if ($.isArray(choices)) {
			for (var i = 0; i < choices.length; i++)
				$buttonTray.append($('<button class="easygui__button">').data('index', i).text(choices[i]));
		} else {
			// Assuming that it is key/value pairs
			var i = 0;
			$.each(choices, function(key, value) {
				$buttonTray.append($('<button class="easygui__button">').data('index', i).data('value', value).text(key));
				i++;
			}); 
		}
		
		$('.easygui__button').on('click', function () {
			$askDiv.hide();
			if (onComplete) {
				var index = parseInt($(this).data("index"), 10);
				var value = $(this).data('value') || choices[index];
				if ($.isFunction(onComplete)) {
					onComplete(index, value);
				} else if ($.isArray(onComplete)) {
					onComplete[index](value);
				}
			}
		});

		$('.easygui__close').on('click', function () {
			$askDiv.hide();
		});

		$askDiv.show();
	};

	var askInput = function(message, title, defaultValue, placeholder, onComplete) {
		var $buttonTray = $('<div class="easygui__button-tray">');
		var $titleBar = $('<div class="easygui__titlebar">');

		$titleBar.append($('<div class="easygui__title">').text(title));
		$titleBar.append($('<button class="easygui__close close">X</button>'));

		$buttonTray
			.append($('<input class="easygui__text-input" type="text">')
				.attr('placeholder', placeholder || '')
				.attr('value', defaultValue || ''))
			.append($('<button class="easygui__button btn btn-default">OK</button>'));

		$askDiv
			.empty()
			.append($titleBar)
			.append($('<div class="easygui__message">').text(message))
			.append($buttonTray);

		$('.easygui__button').on('click', function() {
			$askDiv.hide();
			if (onComplete && $.isFunction(onComplete)) {
				onComplete($('.easygui__text-input').val());
			}
		});

		$('.easygui__close').on('click', function() {
			$askDiv.hide();
		});

		$('.easygui__text-input').on('keyup', function(event) {
			// Trigger click upon ENTER inside input
			if(event.keyCode == 13) {
				$('.easygui__button').click();
			}
		});

		$askDiv.show();

		$('.easygui__text-input').focus();
	};

	return {
		buttonBox: function(message, title, choices, onComplete) {
			askMultipleChoice(message, title, choices, onComplete);
		},
		ynBox: function(message, title, onComplete, yesValue, noValue) {
			askMultipleChoice(message, title, [yesValue || "Yes", noValue || "No"], function(index) { if (onComplete) onComplete(index === 0); });
		},
		msgBox: function(message, title, onComplete, okValue) {
			askMultipleChoice(message, title, [okValue || "OK"], onComplete);
		},
		inputBox: function(message, title, defaultValue, placeholder, onComplete) {
			askInput(message, title, defaultValue, placeholder, onComplete);
		},
	}
}(jQuery));

/*
Examples:

	easygui.msgBox("I interrupt you to get your attention", "Attention", function() { alert('clicked OK'); });

	easygui.ynBox("Do you want to do it?", "Question of the Day", function(isDoingIt) {
		if (isDoingIt)
			alert('Doing it!');
		else
			alert('Not doing it!');
	});

	easygui.buttonBox("Pick from the choices below", "What do you want to do?", ["Move", "Stay", "Run"], function(index, value) { alert('Clicked: ' + value); });

	easygui.buttonBox("Pick from the choices below", "What do you want to do?", ["Move", "Stay", "Run"], [function(value) { alert('moved') }, function() { alert('stayed'); }, function() { alert('ran'); }]);

	easygui.buttonBox("Pick from the choices below", "What do you want to do?", { Move:"mv", Stay:"noop", Run:"go" }, function(index, value) { alert('Clicked: ' + value); });

	easygui.inputBox("What is the average speed of an unladen swallow?", "Please answer before continuing", null, "in <b>kph", function(result) { alert('Entered ' + result); });
*/
