"use strict";

// Storage
function load_data(world_name, data_name) {
	var full_path = "worlds/" + world_name + "/" + data_name + ".yaml"
	return JSON.parse(window.localStorage.getItem(full_path));
};

function save_data(world_name, data_name, obj) {
    var full_path = "worlds/" + world_name + "/" + data_name + ".yaml"
    window.localStorage.setItem(full_path, JSON.stringify(obj));
};
