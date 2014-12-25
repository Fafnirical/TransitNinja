var mongoose = require('mongoose');

module.exports = mongoose.model('StopTime', {
	agency_key: {
		type: String,
		index: true
	},
	trip_id: {
		type: String,
		required: true,
		index: true
	},
	arrival_time: {
		type: String,
		required: true,
		match: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
	},
	departure_time: {
		type: String,
		required: true,
		match: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
	},
	stop_id: {
		type: String,
		required: true
	},
	stop_sequence: {
		type: Number,
		required: true
	},
	stop_headsign: {
		type: String
	},
	pickup_type: {
		type: Number,
		min: 0,
		max: 3,
		default: 0
	},
	drop_off_type: {
		type: Number,
		min: 0,
		max: 3,
		default: 0
	},
	shape_dist_traveled: {
		type: Number
	}
}, 'stoptimes');
