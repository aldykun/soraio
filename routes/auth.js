var express = require('express');
var router = express.Router();
var passport = require('passport');
var conf = require('../lib/conf');
// Login
// show the login form
router.get('/login', function(req, res, next) {
  // render the page and pass in any flash data if it exists
  res.render('login', { title: 'Log In', message: req.flash('loginMessage'), layout: 'auth-layout', site: conf});
});

// process the login form
router.post('/login', passport.authenticate('login', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/auth/login', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}),
function(req, res) {
  console.log("hello");

  if (req.body.ui_login_remember) {
    req.session.cookie.maxAge = 1000 * 60 * 3;
  } else {
    req.session.cookie.expires = false;
  }
res.redirect('/');
});

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

// Signup
// show the signup form
router.get('/signup', function(req, res) {
  // render the page and pass in any flash data if it exists
  res.render('signup', { title: 'Sign Up', message: req.flash('signupMessage'), layout: 'auth-layout', site: conf });
});

// process the signup form
router.post('/signup', passport.authenticate('signup', {
  successRedirect : '/', // redirect to the secure profile section
  failureRedirect : '/auth/signup', // redirect back to the signup page if there is an error
  failureFlash : true // allow flash messages
}));
module.exports = router;
