var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var usersRouter = require('./routes/User.routes');
var DriverRouter = require('./routes/Driver.routes');
var MechanicRouter = require('./routes/Mechanic.routes');
var VehicleRouter = require('./routes/Vehicle.routes');
var ServiceRouter = require('./routes/services.routes');
var SubserviceRouter = require('./routes/Subservice.routes');
var CustomerRouter = require('./routes/Customer.routes');
var BookingRouter = require('./routes/Mechanicbooking.routes');

const mongoose = require('mongoose'); 
mongoose.connect('mongodb://localhost:27017/myvacala'); 
var db = mongoose.connection; 
db.on('error', console.log.bind(console, "connection error")); 
db.once('open', function(callback){ 
    console.log("connection succeeded"); 
}) 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', usersRouter);
app.use('/driver', DriverRouter);
app.use('/mechanic', MechanicRouter);
app.use('/vehicle', VehicleRouter);
app.use('/service', ServiceRouter);
app.use('/subservice',SubserviceRouter);
app.use('/customer',CustomerRouter);
app.use('/booking',BookingRouter);

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
