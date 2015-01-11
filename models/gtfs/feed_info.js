module.exports = function(sequelize, DataTypes) {
	return sequelize.define('FeedInfo', {
		agency_key: {
			type: DataTypes.STRING
		},
		feed_publisher_name: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		feed_publisher_url: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isUrl: true
			}*/
		},
		feed_lang: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		feed_start_date: {
			type: DataTypes.STRING,
			/*validate: {
				is: /\d{4}\d{2}\d{2}/
			}*/
		},
		feed_end_date: {
			type: DataTypes.STRING,
			/*validate: {
				is: /\d{4}\d{2}\d{2}/
			}*/
		},
		feed_version: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'feed_info'
	});
};
