var createError = require('http-errors')
var express = require('express')
var exphbs = require('express-handlebars')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const mongoose = require('mongoose')
require('./models/UrlShorten')
const dotenv = require('dotenv')
dotenv.config()

var indexRouter = require('./routes/index')
var apiRouter = require('./routes/api/index')

var app = express()
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  console.log(err.message)
  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

// Setup mongoserver
const uri = process.env.MONGODB_URI

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
module.exports = app
