var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index.cjs');
var usersRouter = require('./routes/users.cjs');
var cityRouter = require('./routes/cities.js');
var adminRouter= require('./admin/routes/admin.js')
var movieRouter=require('./routes/movies')
var theatreRouter = require('./routes/theatres')
var showRouter=require('./routes/shows')
var seatRouter=require('./routes/seats')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/city', cityRouter);
app.use('/admin',adminRouter);
app.use('/movie',movieRouter);
app.use('/theatre',theatreRouter);
app.use('/show',showRouter)
app.use('/seat',seatRouter)
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
