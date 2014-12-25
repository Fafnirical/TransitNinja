var mongoose = require('mongoose');

module.exports = mongoose.model('FareAttribute', {
	agency_key: {
		type: String,
		index: true
	},
	fare_id: {
		type: String,
		required: true,
		index: true
	},
	price: {
		type: Number,
		required: true
	},
	currency_type: {
		type: String,
		required: true
	},
	payment_method: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	transfers: {
		type: Number,
		required: false,
		// the GTFS spec gives this as "required", but (empty) is a valid value
		min: 0,
		max: 2
	},
	transfer_duration: {
		type: Number
	}
}, 'fareattributes');
