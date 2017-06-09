var _ = require("lodash");
var $ = require("jquery");
var State = require("./libs/state");

$(function() {
  // do your setup here
  	var state = new State();

	$("#code").on("change", e => {
		state.loadId();
	});

	$("#code").on("keyup", e => {
		state.loadId();
  	});

	var checkHash = () => {
		if (location.hash) {
			var code = location.hash.substr(1);
			console.log("Checking code", code);
			$("#code").val(code);
			state.loadId();
		}
	};

	$(window).on("hashchange", checkHash);

	checkHash();
});
