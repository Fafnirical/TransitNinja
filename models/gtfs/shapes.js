var mongoose = require('mongoose');

module.exports = mongoose.model('Shape', {
	agency_key: {
		type: String,
		index: true
	},
	shape_id: {
		type: String,
		required: true,
		index: true
	},
	shape_pt_lat: {
		type: Number,
		required: true,
		min: -90,
		max: 90
	},
	shape_pt_lon: {
		type: Number,
		required: true,
		min: -180,
		max: 180
	},
	shape_pt_sequence: {
		type: Number,
		required: true,
		min: 0
	},
	shape_dist_traveled: {
		type: Number,
		min: 0
	}
}, 'shapes');
