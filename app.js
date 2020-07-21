const express = require('express');
const path = require('path');
const favicon = require('static-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors');
const router = express.Router();
const healthCheck = require('./routes');
const pageContent = require('./routes/pageContent');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const DB_URL =
  'mongodb+srv://chrika:ka9L[p}x@exceed.tvvd1.mongodb.net/<dbname>?retryWrites=true&w=majority';

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

mongoose.set('useFindAndModify', false);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('connected to db');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', async (req, res) => {
  console.log('@@@HEALTHCHECK');
  res.status(200).send('ok');
});
app.use('/page-content', pageContent);

/// catch 404 and forwarding to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});

var debug = require('debug')('my-application');
// var app = require('../app');

app.set('port', process.env.PORT || 5000);
console.log('@@@@@@hi from www');
var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
  console.log('server is up and working correctly');
});

// module.exports = app;
