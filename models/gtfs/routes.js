module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Route', {
		agency_key: {
			type: DataTypes.STRING
		},
		route_id: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		agency_id: {
			type: DataTypes.STRING
		},
		route_short_name: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		route_long_name: {
			type: DataTypes.STRING,
			allowNull: false,
			/*validate: {
				notEmpty: true
			}*/
		},
		route_desc: {
			type: DataTypes.STRING
		},
		route_type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			/*validate: {
				notEmpty: true,
				isInt: true,
				min: 0,
				max: 7
			}*/
		},
		route_url: {
			type: DataTypes.STRING,
			/*validate: {
				isUrl: true
			}*/
		},
		route_color: {
			type: DataTypes.STRING,
			defaultValue: "FFFFFF",
			/*validate: {
				is: /[A-Fa-f0-9]{6}/
			}*/
		},
		route_text_color: {
			type: DataTypes.STRING,
			defaultValue: "000000",
			/*validate: {
				is: /[A-Fa-f0-9]{6}/
			}*/
		}
	}, {
		tableName: 'routes',
		/* TODO: re-enable with better checking
		validate: {
			colorContrast: function() {
				var colors = [
					this.route_color,       // background
					this.route_text_color   // foreground
				];

				var luminance = function(hexcolor) {
					var r = parseInt(hexcolor.substring(0, 2), 16),
					    g = parseInt(hexcolor.substring(2, 4), 16),
					    b = parseInt(hexcolor.substring(4, 6), 16);

					var a = [r,g,b].map(function(v) {
						v /= 255;
						return (v <= 0.03928) ?
							v / 12.92 :
							Math.pow(((v + 0.055) / 1.055), 2.4);
					});
					return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
				};

				var Lx = colors.map(function(color) {
					return luminance(color);
				});

				var contrastRatio = (Math.max.apply(Math, Lx) + 0.05) / (Math.min.apply(Math, Lx) + 0.05);
				if(contrastRatio < 7/1) {
					throw new Error("The contrast ratio between the route_color (" + colors[0] + ") and route_text_color ()" + colors[1] + ") is too low for WCAG AAA compliance.");
				}
			}
		}
		*/
	});
};
