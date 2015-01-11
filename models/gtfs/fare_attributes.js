module.exports = function(sequelize, DataTypes) {
	return sequelize.define('FareAttribute', {
		agency_key: {
			type: DataTypes.STRING
		},
		fare_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isFloat: true
			}*/
		},
		currency_type: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		payment_method: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		transfers: {
			type: DataTypes.INTEGER,
			/*validate: {
				//isInt: true,
				min: 0,
				max: 2
			}*/
		},
		transfer_duration: {
			type: DataTypes.INTEGER
		}
	}, {
		tableName: 'fare_attributes'
	});
};
