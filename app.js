var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose  = require('mongoose');
var swaggerJSDoc = require('swagger-jsdoc');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var ApiRouter = require('./routes/api');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
//var DB_URL = "mongodb://admin_user:admin123@ds161262.mlab.com:61262/demo_login";
var DB_URL = "mongodb://localhost:27017/demo_login";

mongoose.Promise = global.Promise;
mongoose.connect(DB_URL, function(err,res){
  if(err){
    console.log('DB connection failed ' +err)
  }else{
    console.log('DB connection successfull ')
  }
});
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// swagger definition
var swaggerDefinition = {
  info: {
    title: 'LoginApp',
    version: '1.0.0',
    description: "Demo login App ",
    contact:{
      email:'amitkumawat238@gmail.com'
    }
  },
  host: 'localhost:3000',
  basePath: '/api/',
};

// options for the swagger docs
var options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./routes/api.js'],
};

// initialize swagger-jsdoc
var swaggerSpec = swaggerJSDoc(options);
// serve swagger
app.get('/loginapp.json', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', ApiRouter);

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
  //res.render('error');
  res.json({message:err.message});
});

module.exports = app;
