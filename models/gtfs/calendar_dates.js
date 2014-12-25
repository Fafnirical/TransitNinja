var mongoose = require('mongoose');

module.exports = mongoose.model('CalendarDate', {
	agency_key: {
		type: String,
		index: true
	},
	service_id: {
		type: String,
		required: true,
		index: true
	},
	date: {
		type: String,
		required: true,
		match: /\d{4}\d{2}\d{2}/
	},
	exception_type: {
		type: Number,
		required: true,
		min: 1,
		max: 2
	}
}, 'calendardates');
