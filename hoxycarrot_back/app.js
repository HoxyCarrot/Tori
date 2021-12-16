var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

// swagger
const { swaggerUi , specs } = require('./config/swagger');

var app = express();

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(specs,{explorer:false}))

// 이부분은 react
// view engine setup        
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));  
app.use('/movies', express.static(__dirname + '/public/images/movies'));
app.use('/videos', express.static(__dirname + '/public/videos'));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api-kobis',indexRouter)

app.get('/',(req,res,next)=>{
  const title = 'TEST HTML';

  var html = `
  <!doctype html>
  <html>
      <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
      </head>
      <body>
          <h1><a href="/">WEB</a></h1>
          <p>
            <div>
              <form action="/api/kobis/latte_process" method="post">
              <div>
                <input type="text" name='genres' placeholder ='장르'>
                <input type="text" name='type' placeholder ='유형'>
                <input type="text" name='directors' placeholder ='감독 명'>
              </div>
              <input type="submit" value="Enter">
              </form>
            </div>
          </p>
      </body>
  </html>
  `;
  res.send(html);
})


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
  // res.send('error')
  res.render('error');
});

module.exports = app;
