var express = require('express');
var router = express.Router();
var conf = require('../lib/conf');

/* GET posts index. */
router.get('/', function(req, res, next) {
  res.render('index-posts', {layout: 'dashboard', title: 'Posts', message: req.flash('loginMessage'), site: conf, csrfToken: req.csrfToken()});
});
