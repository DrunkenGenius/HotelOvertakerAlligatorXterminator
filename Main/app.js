const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const fs = require('fs');

const app = express();

//Setting up socket.io with express app generator --- https://onedesigncompany.com/news/express-generator-and-socket-io
const server = require('http').Server(app);
require('./sockets.js').initialize(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); //vi bruger sendFile istedet for render

app.use(logger('dev'));
app.use(express.json());
//SAT TIL TRUE DA JEG IKKE KUNNE OVERFØRE OBJEKTER MED POST REQUESTS
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
server.listen(3000, "192.168.1.19");
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = {app: app, server: server};
