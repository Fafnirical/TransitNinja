var fs = require('fs');
var path = require('path');
var pg = require('pg');
var copyFrom = require('pg-copy-streams').from;

var filepath = path.join(__dirname, '..', 'download', 'capital-metro', 'agency.txt');
var conString = 'postgres://postgres:Garrett@localhost/gtfs';

pg.connect(conString, function(err, client, done) {
  var stream = client.query(copyFrom('COPY agency(agency_id,agency_name,agency_url,agency_timezone,agency_lang,agency_phone) FROM STDIN WITH csv header'));
  var fileStream = fs.createReadStream(filepath);
  fileStream.on('error', done);
  fileStream.pipe(stream).on('finish', done).on('error', function(error) {console.error(error);});
});
