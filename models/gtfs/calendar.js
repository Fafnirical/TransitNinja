var mongoose = require('mongoose');

module.exports = mongoose.model('Calendar', {
	service_id: {
		type: String,
		required: true,
		index: true
	},
	monday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	tuesday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	wednesday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	thursday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	friday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	saturday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	sunday: {
		type: Number,
		required: true,
		min: 0,
		max: 1
	},
	start_date: {
		type: String,
		required: true,
		match: /\d{4}\d{2}\d{2}/
	},
	end_date: {
		type: String,
		required: true,
		match: /\d{4}\d{2}\d{2}/
	}
});
