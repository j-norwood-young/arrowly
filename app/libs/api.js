var eventhandler = require("../libs/eventhandler");
var $ = require("jquery");
var url = "http://localhost:6001";

var API = {
	save: function(data) {
		$.post(url + "/save", data)
		.then(result => {
			eventhandler.trigger("saved", result.result);
		})
		.catch(err => {
			console.error(err);
		});
	},
	get: function(id) {
		return $.get(url + "/get/" + id);
	}
};

module.exports = API;