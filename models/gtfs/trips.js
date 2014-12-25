var mongoose = require('mongoose');

module.exports = mongoose.model('Trip', {
	agency_key: {
		type: String,
		index: true
	},
	route_id: {
		type: String,
		required: true,
		index: true
	},
	service_id: {
		type: String,
		required: true
	},
	trip_id: {
		type: String,
		required: true
	},
	trip_headsign: {
		type: String
	},
	trip_short_name: {
		type: String
	},
	direction_id: {
		type: Number,
		min: 0,
		max: 1
	},
	block_id: {
		type: String
	},
	shape_id: {
		type: String
	},
	wheelchair_accessible: {
		type: Number,
		min: 0,
		max: 2
	},
	bikes_allowed: {
		type: Number,
		min: 0,
		max: 2
	}
}, 'trips');
