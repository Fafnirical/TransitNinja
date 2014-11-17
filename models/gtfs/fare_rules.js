var mongoose = require('mongoose');

module.exports = mongoose.model('FareRule', {
	fare_id: {
		type: String,
		required: true,
		index: true
	},
	route_id: {
		type: String
	},
	origin_id: {
		type: String
	},
	destination_id: {
		type: String
	},
	contains_id: {
		type: String
	}
});
