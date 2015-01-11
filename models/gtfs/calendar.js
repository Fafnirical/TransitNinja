module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Calendar', {
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
		monday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		tuesday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		wednesday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		thursday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		friday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		saturday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		sunday: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 1
			}*/
		},
		start_date: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{4}\d{2}\d{2}/
			}*/
		},
		end_date: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				is: /\d{4}\d{2}\d{2}/
			}*/
		}
	}, {
		tableName: 'calendar'
	});
};
