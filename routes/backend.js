var express = require('express');
var router = express.Router();

/* GET posts index. */
router.get('/posts', function(req, res, next) {
  res.send('respond for index of posts');
});

/* GET pages index. */
router.get('/pages', function(req, res, next) {
  res.send('respond for index of pages');
});

/* GET statistics index. */
router.get('/statistics', function(req, res, next) {
  res.send('respond for index of statistics');
});

/* GET settings index. */
router.get('/settings', function(req, res, next) {
  res.send('respond for index of site settings');
});
module.exports = router;
