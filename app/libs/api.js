var eventhandler = require("../events/eventhandler");
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
	},
	update: function(id, data) {
		$.ajax({
			url: url + "/save/" + id,
			type: 'PUT',
			data
		})
		.then(result => {
			eventhandler.trigger("updated", result.result);
		})
		.catch(err => {
			console.error(err);
		});
	},
	addArrow: function(id, data) {
		var self = this;
		self.get(id)
		.then(result => {
			var arrows = result.arrows || [];
			arrows.push(data);
			self.update(id, { arrows });
		});
	}
};

module.exports = API;