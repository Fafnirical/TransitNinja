/*** BEGIN Requirements ***/
var express = require('express'),
    path    = require('path'),
    logger  = require('morgan'),
    stylus  = require('stylus'),
    nib     = require('nib');

var app = express();
/*** END Requirements ***/

/*** BEGIN Configuration ***/
//app.engine('jade', require('jade').__express);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));

app.use(stylus.middleware({
	src: path.join(__dirname, 'src'),
	dest: path.join(__dirname, 'public'),
	compile: function(str, path) {
		return stylus(str)
		.set('filename', path)
		.set('compress', false)
		//.set('sourcemap', true)
		.use(nib());
	}
}));

app.use(express.static(
	path.join(__dirname, 'public')
));
/*** END Configuration ***/

/*** BEGIN Routes ***/
// <root>/ displays the standard index things
var index = require(path.join(__dirname, 'routes/index'));
app.use('/', index);

// <root>/api/ is the root endpoint for the APIs; currently, it gives the list of APIs
var api = require(path.join(__dirname, 'routes/api'));
app.use('/api', api);

// <root>/users displays a list of users
//var users  = require('./routes/users');
//app.use('/users', users);
/*** END Routes ***/

module.exports = app;
