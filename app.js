var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session  = require('express-session');
var csrf = require('csurf');

var multer  = require('multer')
var upload = multer( { dest: './public/media' } );

var routes = require('./routes/index');
var users = require('./routes/users');
var backend = require('./routes/backend');
var auth = require('./routes/auth');

var passport = require('passport');
var flash    = require('connect-flash');
var pass = require('./lib/passport');
var hbs = require('hbs');

var app = express();
var blocks = {};
// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'app')]);
app.set('view engine', 'hbs');
// handlebars setup
hbs.registerHelper('extend', function(name, context) {
    var block = blocks[name];
    if (!block) {
        block = blocks[name] = [];
    }

    block.push(context.fn(this)); // for older versions of handlebars, use block.push(context(this));
});
hbs.registerHelper('block', function(name) {
    var val = (blocks[name] || []).join('\n');

    // clear the block
    blocks[name] = [];
    return val;
});
hbs.registerHelper('compare', function (lvalue, operator, rvalue, options) {

    var operators, result;

    if (arguments.length < 3) {
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");
    }

    if (options === undefined) {
        options = rvalue;
        rvalue = operator;
        operator = "===";
    }

    operators = {
        '==': function (l, r) { return l == r; },
        '===': function (l, r) { return l === r; },
        '!=': function (l, r) { return l != r; },
        '!==': function (l, r) { return l !== r; },
        '<': function (l, r) { return l < r; },
        '>': function (l, r) { return l > r; },
        '<=': function (l, r) { return l <= r; },
        '>=': function (l, r) { return l >= r; },
        'typeof': function (l, r) { return typeof l == r; }
    };

    if (!operators[operator]) {
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);
    }

    result = operators[operator](lvalue, rvalue);

    if (result) {
        return options.fn(this);
    } else {
        return options.inverse(this);
    }

});
hbs.registerPartials(path.join(__dirname, '/views/partials'));

pass(passport);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('node-sass-middleware')({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true,
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));
//call bower_components to public
app.use('/bower_components',  express.static(path.join(__dirname, 'bower_components')));
app.use('/assets/clearmin',  express.static(path.join(__dirname, 'public/clearmin/src')));
app.use('/public/media',  express.static(path.join(__dirname, 'public/media')));

//passport setup
app.use(session({
	secret: 'SoraWaJiyuDa',
	resave: true,
	saveUninitialized: true
 } )); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

app.use('/', routes);
app.use('/users', users);
app.use(csrf({ cookie: true }));
app.use('/backend', backend);
app.use('/auth', auth);
app.post('/upload/media', upload.single( 'file' ), function( req, res, next ) {
  req.file.path = '/' + req.file.path;
  res.status( 200 ).send( req.file );
});
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
app.use(function (err, req, res, next) {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  // handle CSRF token errors here
  err.status = 403;
  next(err);
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      errstat: err.status,
      errmsg: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    errstat: err.status,
    errmsg: err.message,
    error: {}
  });
});


module.exports = app;
