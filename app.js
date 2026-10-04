var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var exphbs = require('express-handlebars');

var travelerRouter = require('./app_server/routes/traveler');
var tripsApiRouter = require('./app_api/routes/trips');

// Connect to MongoDB via Mongoose
var db = require('./app_api/models/db');
db.connect();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.engine('hbs', exphbs.engine({
  extname: '.hbs',
  defaultLayout: false,
  partialsDir: path.join(__dirname, 'app_server', 'views', 'partials')
}));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allow the Angular admin SPA (localhost:4200) to call the API
app.use('/api', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
});

app.use('/', travelerRouter);
app.use('/api', tripsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
