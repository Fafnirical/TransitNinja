/*** BEGIN Requirements ***/
var //
    express      = require('express'),
    path         = require('path'),
    logger       = require('morgan'),
    stylus       = require('stylus');

var app = express();
/*** END Requirements ***/

/*** BEGIN Configuration ***/
//app.engine('jade', require('jade').__express);
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
/*app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());*/
app.use(stylus.middleware({
  src: path.join(__dirname, 'src'),
  dest: path.join(__dirname, 'public'),
  compile: function(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('compress', true);
  }
}));
app.use(express.static(
  path.join(__dirname, 'public')
));
/*** END Configuration ***/

/*** BEGIN Routes ***/
// <root>/ displays the standard index things
var routes = require('./routes/index');
app.use('/', routes);

// <root>/users displays a list of users
//var users  = require('./routes/users');
//app.use('/users', users);
/*** END Routes ***/

module.exports = app;
