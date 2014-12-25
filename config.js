module.exports = {
	mongo_url: process.env.MONGOHQ_URL || 'mongodb://localhost:27017/gtfs',
	agencies: [
		{
			agency_key: 'capital-metro',
			url: 'download/capital-metro_20141209_0128.zip'
		}
	]
};
