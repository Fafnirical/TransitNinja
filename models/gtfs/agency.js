var mongoose = require('mongoose');

module.exports = mongoose.model('Agency', {
	agency_key: {
		type: String,
		index: true
	},
	agency_id: {
		type: String,
		index: true
	},
	agency_name: {
		type: String,
		required: true
	},
	agency_url: {
		type: String,
		required: true
		//TODO match: /url/
	},
	agency_timezone: {
		type: String,
		required: true
	},
	agency_lang: {
		type: String
	},
	agency_phone: {
		type: String
		//TODO match: /phonenumber/
	},
	agency_fare_url: {
		type: String
		//TODO match: /url/
	}
}, 'agencies');
