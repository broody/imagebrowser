var express = require('express');
var router = express.Router();
var Entry = require('./models/entry');


router.get('/getEntries/:idx/:num', function(req, res) {
	Entry.find().limit(req.params.num).sort({'created': -1}).exec(function(err, entries) {
		if(err) {
			res.json(returnJson(err));
		}
		var ret = returnJson('success', entries);
		res.json(ret);
	});
});


function returnJson(msg, data) {
	var ret = {};
	ret.message = msg;
	if(typeof data !== 'undefined') ret.data = data;
	return ret;
}
module.exports = router;