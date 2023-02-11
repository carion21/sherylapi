const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const cron = require('node-cron');

const morgan  = require('morgan');
const winston = require('winston') 

require('dotenv').config()

const { getAppName, getSequelizeObject } = require('./config/constante');

const HomeController = require('./controllers/HomeController');
const ApiController = require('./controllers/ApiController');


const app = express();

// journalisation des requetes
// app.use(morgan("combined"))

const { combine, timestamp, label, printf } = winston.format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
  format: combine(
    label({ label: "API" }),
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.File({
      filename: `logs/error-${new Date().toISOString().substring(0, 10)}.log`,
      level: "error"
    }),
    new winston.transports.File({
      filename: `logs/combined-${new Date().toISOString().substring(0, 10)}.log`
    })
  ]
});

app.use(morgan("combined", {
  stream: {
    write: message => logger.info(message)
  }
}))


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sequelize = getSequelizeObject()
sequelize
  .authenticate()
  .then(() => console.log("Connection has been established succesfully."))
  .catch(err => console.error("Unable to connect to the database: ",err))
global.sequelize = sequelize

app.use(
  '/',
  (req, res, next) => {
    console.log("__HomeController____________________")
    next()
  }, HomeController
)

app.use(
  '/api',
  (req, res, next) => {
    console.log("__ApiController_____________________")
    next()
  }, ApiController
)

//node cron


cron.schedule('* * * * *', () => {
  console.log('cron running a task every minute');
});

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

module.exports = app;
