// require
var fs = require('fs'),
path = require('path'),
mkdirp = require('mkdirp'),
async = require('async'),
csvparse = require('csv-parse'),
request = require('request'),
unzip = require('unzip'),
Db = require('mongodb').Db,
q;

// load config
try {
	var config = require('../config.js');
} catch (e) {
	handleError(new Error("Cannot find config.js"));
}

var downloadDir = config.download_location || 'download';
var concurrency = config.concurrency || 1;

var GTFSFiles = {
	Agency: {
		fileName: 'agency',
		collection: 'agency',
		model: require('../models/gtfs/agency')
	},
	CalendarDate: {
		fileName: 'calendar_dates',
		collection: 'calendardates',
		model: require('../models/gtfs/calendar_dates')
	},
	Calendar: {
		fileName: 'calendar',
		collection: 'calendar',
		model: require('../models/gtfs/calendar')
	},
	FareAttribute: {
		fileName: 'fare_attributes',
		collection: 'fareattributes',
		model: require('../models/gtfs/fare_attributes')
	},
	FareRule: {
		fileName: 'fare_rules',
		collection: 'farerules',
		model: require('../models/gtfs/fare_rules')
	},
	FeedInfo: {
		fileName: 'feed_info',
		collection: 'feedinfo',
		model: require('../models/gtfs/feed_info')
	},
	Frequency: {
		fileName: 'frequencies',
		collection: 'frequencies',
		model: require('../models/gtfs/frequencies')
	},
	Route: {
		fileName: 'routes',
		collection: 'routes',
		model: require('../models/gtfs/routes')
	},
	Shape: {
		fileName: 'shapes',
		collection: 'shapes',
		model: require('../models/gtfs/shapes')
	},
	StopTime: {
		fileName: 'stop_times',
		collection: 'stoptimes',
		model: require('../models/gtfs/stop_times')
	},
	Stop: {
		fileName: 'stops',
		collection: 'stops',
		model: require('../models/gtfs/stops')
	},
	Transfer: {
		fileName: 'transfers',
		collection: 'transfers',
		model: require('../models/gtfs/transfers')
	},
	Trip: {
		fileName: 'trips',
		collection: 'trips',
		model: require('../models/gtfs/trips')
	},
};


module.exports = {
	get: {
		gtfs: function() {}
	},
	add: {
		gtfs: function() {
			Db.connect(config.mongo_url, {w: 1}, function(err, db) {
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
							db.collection(GTFSFile.collection, function(e, collection) {
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
										collection.insert(line, function(e, inserted) {
											if(e) {
												handleError(e);
											}
										});
									}
								});
								parser.on('end', function(count) {
									cb();
								});
								//parser.on('error', handleError);

								input.pipe(parser);
							});
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
