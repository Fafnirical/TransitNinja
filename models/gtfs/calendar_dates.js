module.exports = function(sequelize, DataTypes) {
	return sequelize.define('CalendarDate', {
		agency_key: {
			type: DataTypes.STRING
		},
		service_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		date: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{4}\d{2}\d{2}/
			}*/
		},
		exception_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 1,
				max: 2
			}*/
		}
	}, {
		tableName: 'calendar_dates'
	});
};
