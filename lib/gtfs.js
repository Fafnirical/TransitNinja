// require
var fs = require('fs'),
path = require('path'),
mkdirp = require('mkdirp'),
async = require('async'),
csvparse = require('csv-parse'),
request = require('request'),
unzip = require('unzip'),
Sequelize = require('sequelize'),
q;

// load config
try {
	var config = require(__dirname + '/../config');
} catch (e) {
	handleError(new Error("Cannot find config.js"));
}

var sequelize = new Sequelize(
	config.database.name || 'gtfs',
	config.database.username || 'username',
	config.database.password || 'password',
	{
		host: config.database.host || 'localhost',
		port: config.database.port || '5432',
		dialect: config.database.type || 'postgres',
		pool: true,
		maxConnections: 5,
		maxIdleTime: 30
	}
);

var downloadDir = config.download_location || 'download';
var concurrency = config.concurrency || 1;

var GTFSFiles = {
	Agency: {
		fileName: 'agency',
		model: sequelize.import(__dirname + '/../models/gtfs/agency')
	},
	CalendarDate: {
		fileName: 'calendar_dates',
		model: sequelize.import(__dirname + '/../models/gtfs/calendar_dates')
	},
	Calendar: {
		fileName: 'calendar',
		model: sequelize.import(__dirname + '/../models/gtfs/calendar')
	},
	FareAttribute: {
		fileName: 'fare_attributes',
		model: sequelize.import(__dirname + '/../models/gtfs/fare_attributes')
	},
	FareRule: {
		fileName: 'fare_rules',
		model: sequelize.import(__dirname + '/../models/gtfs/fare_rules')
	},
	FeedInfo: {
		fileName: 'feed_info',
		model: sequelize.import(__dirname + '/../models/gtfs/feed_info')
	},
	Frequency: {
		fileName: 'frequencies',
		model: sequelize.import(__dirname + '/../models/gtfs/frequencies')
	},
	Route: {
		fileName: 'routes',
		model: sequelize.import(__dirname + '/../models/gtfs/routes')
	},
	Shape: {
		fileName: 'shapes',
		model: sequelize.import(__dirname + '/../models/gtfs/shapes')
	},
	StopTime: {
		fileName: 'stop_times',
		model: sequelize.import(__dirname + '/../models/gtfs/stop_times')
	},
	Stop: {
		fileName: 'stops',
		model: sequelize.import(__dirname + '/../models/gtfs/stops')
	},
	Transfer: {
		fileName: 'transfers',
		model: sequelize.import(__dirname + '/../models/gtfs/transfers')
	},
	Trip: {
		fileName: 'trips',
		model: sequelize.import(__dirname + '/../models/gtfs/trips')
	}
};


module.exports = {
	get: {
		gtfs: function() {}
	},
	add: {
		gtfs: function() {
			sequelize.sync().then(function() {
				q = async.queue(downloadGTFS, concurrency);
				config.agencies.forEach(function(item) {
					var agency;
					if(typeof item === 'string') {
						agency = {
							agency_key: item,
							agency_url: 'http://www.gtfs-data-exchange.com/agency/' + item + '/latest.zip'
						};
					} else {
						agency = {
							agency_key: item.agency_key,
							agency_url: item.url
						};
					}
					if(!agency.agency_key || !agency.agency_url) {
						handleError(new Error("No URL or agency key provided."));
					}
					q.push(agency);
				});

				q.drain = function(e) {
					console.log('All agencies completed (' + config.agencies.length + ' total)');
				};

				function downloadGTFS(task, cb) {
					var agency_key = task.agency_key,
					agency_url = task.agency_url;

					console.log("Starting: " + agency_key);

					async.series(
						[
							downloadFiles,
							importFiles,
						],
						function(e, results) {
							console.log(e || agency_key + ": Completed");
							cb();
						}
					);

					function downloadFiles(cb) {
						var file_protocol = require('url').parse(agency_url).protocol;
						if(file_protocol === "http:" || file_protocol === "https:") {
							// if the file is on a remote server
							request(agency_url, function(err, response, body) {
								if(response && response.statusCode != 200) {
									handleError(new Error("Couldn't download GTFS file"));
								}
								console.log(agency_key + ": Download successful");

								fs.createReadStream(downloadDir + '/' + agency_key + '/latest.zip')
									.pipe(unzip.Extract({ path: downloadDir + '/' + agency_key}).on('close', cb))
									.on('error', handleError);
							}).pipe(fs.createWriteStream(downloadDir + '/' + agency_key + '/latest.zip'));
						} else {
							// if the file is local
							if (!fs.existsSync(agency_url)) {
								handleError(new Error("File does not exist"));
							}
							mkdirp(downloadDir + '/' + agency_key, function(e) {
								if(e) {
									handleError(e);
								}
							});

							fs.createReadStream(agency_url)
								.pipe(fs.createWriteStream(downloadDir + '/' + agency_key + '/latest.zip'))
								.on('close', function() {
									fs.createReadStream(downloadDir + '/' + agency_key + '/latest.zip')
										.pipe(unzip.Extract({ path: downloadDir + '/' + agency_key }).on('close', cb))
										.on('error', handleError);
								})
								.on('error', handleError);
						}
					}

					function importFiles(cb) {
						async.eachSeries(Object.keys(GTFSFiles), function(key, cb) {
							var GTFSFile = GTFSFiles[key];
							var filepath = path.join(downloadDir, agency_key, GTFSFile.fileName + '.txt');

							if(!fs.existsSync(filepath)) {
								return cb();
							}
							console.log(agency_key + ": Importing " + GTFSFile.fileName);
							var input = fs.createReadStream(filepath);
							var parser = csvparse({columns: true});
							parser.on('readable', function() {
								while (line = parser.read()) {
									// remove null values
									for(var key in line) {
										if(line[key] === null) {
											delete line[key];
										}
									}

									line.agency_key = agency_key;

									// insert into database
									GTFSFile.model
										.build(line)
										.save()
										.catch(function(error) {
											if(error) {
												handleError(error);
											}
										});
								}
							});
							parser.on('end', function(count) {
								cb();
							});
							parser.on('error', handleError);

							input.pipe(parser);
						}, function(e) {
							cb(e, 'import');
						});
					}
				}
			});
		}
	}
};

function handleError(e) {
	console.error(e || 'Unknown Error');
	process.exit(1);
}
