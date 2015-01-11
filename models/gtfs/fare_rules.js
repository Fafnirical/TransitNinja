module.exports = function(sequelize, DataTypes) {
	return sequelize.define('FareRule', {
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
		route_id: {
			type: DataTypes.STRING
		},
		origin_id: {
			type: DataTypes.STRING
		},
		destination_id: {
			type: DataTypes.STRING
		},
		contains_id: {
			type: DataTypes.STRING
		}
	}, {
		tableName: 'fare_rules'
	});
};
