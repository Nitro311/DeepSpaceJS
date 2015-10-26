"use strict";

var logging = (function () {
	var logDiv = $('<div class="logging" style="display: none; height: 200px; overflow: auto">');
	
	$('body').append(logDiv);
	
	return {
		info: function(message) {
			message = moment().format("YYYY-MM-DDTHH:mm:ss ZZ") + ' - ' + message;
			console.log(message);
			logDiv.append($('<div/>').html(message).text() + '<br/>');
			logDiv.stop().animate({
				scrollTop: logDiv[0].scrollHeight
			}, 800);
		},
		toggle: function() {
			$('.logging').stop().toggle(800);
		}
	};
}());
