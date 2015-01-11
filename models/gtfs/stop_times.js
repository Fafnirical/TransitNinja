module.exports = function(sequelize, DataTypes) {
	return sequelize.define('StopTime', {
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
		arrival_time: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
			}*/
		},
		departure_time: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{1,2}:[0-5][0-9]:[0-5][0-9]/
			}*/
		},
		stop_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		stop_sequence: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0
			}*/
		},
		stop_headsign: {
			type: DataTypes.STRING
		},
		pickup_type: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			/*validate: {
				isInt: true,
				min: 0,
				max: 3,
			}*/
		},
		drop_off_type: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			/*validate: {
				isInt: true,
				min: 0,
				max: 3,
			}*/
		},
		shape_dist_traveled: {
			type: DataTypes.FLOAT,
			/*validate: {
				isFloat: true
			}*/
		}
	}, {
		tableName: 'stop_times'
	});
};
