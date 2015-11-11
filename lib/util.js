var fs = require('fs');

module.exports = util = {
	getLine: function(filename, line_no, callback) {
		var data = fs.readFileSync(filename, 'utf8');
		var lines = data.split("\n");

		if(+line_no > lines.length){
			throw new Error('File end reached without finding line');
		}

		callback(null, lines[+line_no]);
	}
};
