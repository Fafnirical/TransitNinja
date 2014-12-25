var mongoose = require('mongoose');

module.exports = mongoose.model('Stop', {
	agency_key: {
		type: String,
		index: true
	},
	stop_id: {
		type: String,
		required: true,
		index: true
	},
	stop_code: {
		type: String,
	},
	stop_name: {
		type: String,
		required: true
	},
	stop_desc: {
		type: String,
	},
	stop_lat: {
		type: Number,
		required: true
	},
	stop_lon: {
		type: Number,
		required: true
	},
	zone_id: {
		type: String,
	},
	stop_url: {
		type: String,
		//TODO match: /url/
	},
	location_type: {
		type: Number,
		min: 0,
		max: 1
	},
	parent_station: {
		type: String
	},
	stop_timezone: {
		type: String,
	},
	wheelchair_boarding: {
		type: Number,
		min: 0,
		max: 2
	}
}, 'stops');
