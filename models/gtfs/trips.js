module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Trip', {
		agency_key: {
			type: DataTypes.STRING,
		},
		route_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		service_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		trip_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		trip_headsign: {
			type: DataTypes.STRING
		},
		trip_short_name: {
			type: DataTypes.STRING
		},
		direction_id: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		block_id: {
			type: DataTypes.STRING
		},
		shape_id: {
			type: DataTypes.STRING
		},
		wheelchair_accessible: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0,
				max: 2
			}*/
		},
		bikes_allowed: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0,
				max: 2
			}*/
		}
	}, {
		tableName: 'trips'
	});
};
