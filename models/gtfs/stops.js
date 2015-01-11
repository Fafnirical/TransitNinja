module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Stop', {
		agency_key: {
			type: DataTypes.STRING
		},
		stop_id: {
			type: DataTypes.STRING,
			required: true,
			/*validate: {
				notEmpty: true
			}*/
		},
		stop_code: {
			type: DataTypes.STRING,
		},
		stop_name: {
			type: DataTypes.STRING,
			required: true,
			/*validate: {
				notEmpty: true
			}*/
		},
		stop_desc: {
			type: DataTypes.TEXT
		},
		stop_lat: {
			type: DataTypes.FLOAT,
			required: true,
			/*validate: {
				notEmpty: true,
				isFloat: true,
				min: -90,
				max: 90
			}*/
		},
		stop_lon: {
			type: DataTypes.FLOAT,
			required: true,
			/*validate: {
				notEmpty: true,
				isFloat: true,
				min: -180,
				max: 180
			}*/
		},
		zone_id: {
			type: DataTypes.STRING,
		},
		stop_url: {
			type: DataTypes.STRING,
			/*validate: {
				isUrl: true
			}*/
		},
		location_type: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		parent_station: {
			type: DataTypes.STRING
		},
		stop_timezone: {
			type: DataTypes.STRING
		},
		wheelchair_boarding: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0,
				max: 2
			}*/
		}
	}, {
		tableName: 'stops'
	});
};
