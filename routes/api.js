var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {title: 'API'});
});

/*** Static API ***/
var staticRouter = express.Router({mergeParams: true});
router.use('/static', staticRouter);
/* GET static API info */
staticRouter.get('/', function(req, res) {
	var query = req.query;
	res.json(query);
});

/*** Realtime API ***/
var realtimeRouter = express.Router({mergeParams: true});
router.use('/realtime', realtimeRouter);
/* GET realtime API info */
realtimeRouter.get('/', function(req, res) {
	var query = req.query;
	res.json(query);
});

module.exports = router;
