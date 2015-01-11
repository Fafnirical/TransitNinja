module.exports = {
	database: {
		name: 'gtfs',
		username: 'username',
		password: 'password',
		host: 'localhost',
		port: 5432,
		type: 'postgres'
	},
	agencies: [
		{
			agency_key: 'capital-metro',
			url: 'download/capital-metro_20141209_0128.zip'
		}
	]
};
