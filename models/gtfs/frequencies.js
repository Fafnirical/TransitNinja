var mongoose = require('mongoose');

module.exports = mongoose.model('Frequency', {
	agency_key: {
		type: String,
		index: true
	},
	trip_id: {
		type: String,
		required: true,
		index: true
	},
	start_time: {
		type: String,
		required: true,
		match: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
	},
	end_time: {
		type: String,
		required: true,
		match: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
	},
	headway_secs: {
		type: Number,
		required: true
	},
	exact_times: {
		type: Number,
		min: 0,
		max: 1
	}
}, 'frequencies');
