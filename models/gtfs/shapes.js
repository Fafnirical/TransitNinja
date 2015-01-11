module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Shape', {
		agency_key: {
			type: DataTypes.STRING
		},
		shape_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		shape_pt_lat: {
			type: DataTypes.FLOAT,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isFloat: true,
				min: -90,
				max: 90
			}*/
		},
		shape_pt_lon: {
			type: DataTypes.FLOAT,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isFloat: true,
				min: -180,
				max: 180
			}*/
		},
		shape_pt_sequence: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0
			}*/
		},
		shape_dist_traveled: {
			type: DataTypes.FLOAT,
			/*validate: {
				//isFloat: true,
				min: 0
			}*/
		}
	}, {
		tableName: 'shapes'
	});
};
