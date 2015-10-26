"use strict";

var notification = (function ($) {
	var DEFAULT_DURATION_MS = 4000;
	var $notificationDiv = $('<div class="notification" style="position: absolute; left: 0; top:0; width: 100%;">');
	var $alertDiv = $('<div>').hide();

	$notificationDiv.append($alertDiv);
	$('body').append($notificationDiv);

	$alertDiv.on('click', function() {
		$alertDiv.finish().fadeOut();
	});

	return {
		success: function(message, msDuration) {
			$alertDiv
				.removeClass()
				.addClass('alert')
				.addClass('alert-success')
				.text(message)
				.finish().fadeIn().delay(msDuration || DEFAULT_DURATION_MS).fadeOut();
		},
		info: function(message, msDuration) {
			$alertDiv
				.removeClass()
				.addClass('alert')
				.addClass('alert-info')
				.text(message)
				.finish().fadeIn().delay(msDuration || DEFAULT_DURATION_MS).fadeOut();
		},
		warning: function(message, msDuration) {
			$alertDiv
				.removeClass()
				.addClass('alert')
				.addClass('alert-warning')
				.text(message)
				.finish().fadeIn().delay(msDuration || DEFAULT_DURATION_MS).fadeOut();
		},
		danger: function(message, msDuration) {
			$alertDiv
				.removeClass()
				.addClass('alert')
				.addClass('alert-danger')
				.text(message)
				.finish().fadeIn().delay(msDuration || DEFAULT_DURATION_MS).fadeOut();
		}
	};
}(jQuery));
