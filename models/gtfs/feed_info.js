var mongoose = require('mongoose');

module.exports = mongoose.model('FeedInfo', {
	agency_key: {
		type: String,
		index: true
	},
	feed_publisher_name: {
		type: String,
		required: true,
		index: true
	},
	feed_publisher_url: {
		type: String,
		required: true
		//TODO: match: /url/
	},
	feed_lang: {
		type: String,
		required: true
	},
	feed_start_date: {
		type: Number,
		match: /\d{4}\d{2}\d{2}/
	},
	feed_end_date: {
		type: Number,
		match: /\d{4}\d{2}\d{2}/
	},
	feed_version: {
		type: String
	}
}, 'feedinfo');
