/*jshint browser: true, devel: true, jquery: true, globalstrict: true*/
/*exported storage*/
"use strict";

var storage = (function (localStorage) {
	return {
		loadData: function (world_name, data_name) {
			var full_path = "worlds/" + world_name + "/" + data_name;
			return JSON.parse(localStorage.getItem(full_path));
		},
		saveData: function (world_name, data_name, obj) {
			var full_path = "worlds/" + world_name + "/" + data_name;
			localStorage.setItem(full_path, JSON.stringify(obj));
		},
		clear: function() {
			localStorage.clear();
		}
	};
}(window.localStorage));
