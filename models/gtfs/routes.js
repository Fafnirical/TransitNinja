var mongoose = require('mongoose');

module.exports = mongoose.model('Route', {
	agency_key: {
		type: String,
		index: true
	},
	route_id: {
		type: String,
		required: true,
		index: true
	},
	agency_id: {
		type: String
	},
	route_short_name: {
		type: String,
		required: true
	},
	route_long_name: {
		type: String,
		required: true
	},
	route_desc: {
		type: String
	},
	route_type: {
		type: Number,
		required: true,
		min: 0,
		max: 7
	},
	route_url: {
		type: String
		//TODO match: /url/
	},
	route_color: {
		type: String
	},
	route_text_color: {
		type: String
	}
}, 'routes');
