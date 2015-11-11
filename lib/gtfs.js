// require
var fs = require('fs'),
path = require('path'),
mkdirp = require('mkdirp'),
async = require('async'),
csvparse = require('csv-parse'),
request = require('request'),
unzip = require('unzip'),
pg = require('pg'),
copyFrom = require('pg-copy-streams').from,
util = require(path.join(__dirname, 'util')),
q;

// load config
try {
	var config = require(path.join(__dirname, '..', 'config'));
} catch (e) {
	handleError("Cannot find config.js");
}

var conString = 'postgres://postgres:Garrett@localhost/gtfs';
/*	config.database.type || 'postgres' + '://' +
	config.database.username || 'username' + ':' +
	config.database.password || 'password' + '@' +
	config.database.host || 'localhost' + ':' +
	config.database.port || '5432' + '/' +
	config.database.name || 'gtfs';*/

var downloadDir = config.download_location || 'download';
var concurrency = config.concurrency || 1;

var GTFSFiles = {
	Agency: 'agency',
	CalendarDate: 'calendar_dates',
	Calendar: 'calendar',
	FareAttribute: 'fare_attributes',
	FareRule: 'fare_rules',
	FeedInfo: 'feed_info',
	Frequency: 'frequencies',
	Route: 'routes',
	Shape: 'shapes',
	StopTime: 'stop_times',
	Stop: 'stops',
	Transfer: 'transfers',
	Trip: 'trips'
};


module.exports = {
	get: {
		gtfs: function() {}
	},
	add: {
		gtfs: function() {
			pg.connect(conString, function(err, client, done) {
				if(err) {
					return console.error('error fetching client from pool', err);
				}
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
					done();
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
									handleError("Couldn't download GTFS file");
								}
								console.log(agency_key + ": Download successful");

								fs.createReadStream(path.join(downloadDir, agency_key, 'latest.zip'))
									.pipe(unzip.Extract({ path: path.join(downloadDir, agency_key) }).on('close', cb))
									.on('error', handleError);
							}).pipe(fs.createWriteStream(path.join(downloadDir, agency_key, 'latest.zip')));
						} else {
							// if the file is local
							if (!fs.existsSync(agency_url)) {
								handleError(new Error("File does not exist"));
							}
							mkdirp(path.join(downloadDir, agency_key), function(e) {
								if(e) {
									handleError(e);
								}
							});

							fs.createReadStream(agency_url)
								.pipe(fs.createWriteStream(path.join(downloadDir, agency_key, 'latest.zip')))
								.on('close', function() {
									fs.createReadStream(path.join(downloadDir, agency_key, 'latest.zip'))
										.pipe(unzip.Extract({ path: path.join(downloadDir, agency_key) }).on('close', cb))
										.on('error', handleError);
								})
								.on('error', handleError);
						}
					}

					function importFiles(cb) {
						async.eachSeries(Object.keys(GTFSFiles), function(key, next) {
							var GTFSFile = GTFSFiles[key];
							var filepath = path.join(downloadDir, agency_key, GTFSFile + '.txt');

							if(!fs.existsSync(filepath)) {
								return next();
							}
							console.log(agency_key + ": Importing " + GTFSFile);

							var headers;
							util.getLine(filepath, 0, function(err, line) {
								if(err) {
									handleError(err);
								}
								headers = line.trim();
							});

							var stream = client.query(copyFrom("COPY " + GTFSFile + "(" + headers + ") FROM STDIN WITH csv header delimiter ','"));
							var fileStream = fs.createReadStream(filepath);
							fileStream.on('error', function(err) { console.log(err); done(); });
							fileStream.pipe(stream).on('finish', done).on('error', function(err) { console.log(err); done(); });

							next();
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
