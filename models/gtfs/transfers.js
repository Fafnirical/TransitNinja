var mongoose = require('mongoose');

module.exports = mongoose.model('Transfer', {
	agency_key: {
		type: String,
		index: true
	},
	from_stop_id: {
		type: String,
		required: true,
		index: true
	},
	to_stop_id: {
		type: String,
		required: true,
		index: true
	},
	transfer_type: {
		type: Number,
		required: true,
		min: 0,
		max: 3
	},
	min_transfer_time: {
		type: Number
	}
}, 'transfers');
