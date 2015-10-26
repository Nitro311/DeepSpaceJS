/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*globals moment*/
/*exported logging*/
"use strict";

var logging = (function ($, moment, console) {
	var $logDiv = $('<div class="logging" style="position: absolute; visiblility: hidden; width: 100%; height: 100px; overflow: auto">');

	$('body').append($logDiv);

	var htmlEncode = function (raw) {
		return String(raw)
            .replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
	};

	return {
		info: function (message) {
			message = moment().format("YYYY-MM-DDTHH:mm:ss ZZ") + ' - ' + message;
			console.log(message);
			$logDiv.append(htmlEncode(message) + '<br/>');
			$logDiv.stop().animate({
				scrollTop: $logDiv[0].scrollHeight
			}, 800);
		},
		toggle: function () {
			if ($logDiv.css('visibility') === 'hidden') {
				$logDiv.css('visibility', 'visible');
			} else {
				$logDiv.css('visibility', 'hidden');
			}
		}
	};
}(jQuery, moment, console));
