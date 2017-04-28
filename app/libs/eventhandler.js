var eventListners = {};

var EventHandler = {
	listen: (event, fn) => {
		if (!eventListners[event]) {
			eventListners[event] = [fn];
		} else {
			eventListners[event].push(fn);
		}
	},
	trigger: (event, params) => {
		if (eventListners[event]) {
			eventListners[event].forEach(fn => {
				fn(params);
			});
		}
	}
};

module.exports = EventHandler;