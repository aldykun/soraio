var express = require('express');
var router = express.Router();
var conf = require('../lib/conf');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { user : req.user, site: conf });
});

module.exports = router;
