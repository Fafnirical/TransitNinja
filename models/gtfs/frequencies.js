module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Frequency', {
		agency_key: {
			type: DataTypes.STRING
		},
		trip_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		start_time: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
			}*/
		},
		end_time: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
			}*/
		},
		headway_secs: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		exact_times: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0,
				max: 1
			}*/
		}
	}, {
		tableName: 'frequencies'
	});
};
