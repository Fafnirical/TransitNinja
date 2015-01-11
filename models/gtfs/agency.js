module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Agency', {
		agency_key: {
			type: DataTypes.STRING
		},
		agency_id: {
			type: DataTypes.STRING
		},
		agency_name: {
			type: DataTypes.STRING,
			allowNull: false
		},
		agency_url: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isUrl: true
			}*/
		},
		agency_timezone: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		agency_lang: {
			type: DataTypes.STRING
		},
		agency_phone: {
			type: DataTypes.STRING,
			/* TODO
			validate: {
				isPhone: function(value) {

				}
			}
			*/
		},
		agency_fare_url: {
			type: DataTypes.STRING,
			/*validate: {
				isUrl: true
			}*/
		}
	}, {
		tableName: 'agencies'
	});
};
