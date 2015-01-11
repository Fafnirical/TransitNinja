module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Transfer', {
		agency_key: {
			type: DataTypes.STRING,
		},
		from_stop_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		to_stop_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		transfer_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 3
			}*/
		},
		min_transfer_time: {
			type: DataTypes.INTEGER,
			/*validate: {
				isInt: true,
				min: 0
			}*/
		}
	}, {
		tableName: 'transfers'
	});
};
