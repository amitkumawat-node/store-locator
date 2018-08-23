var express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, '../client'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../client')));
var DB_URL = 'mongodb://localhost:27017/locator';
mongoose.Promise = global.Promise;

const options_mongoose = {
    autoIndex: false, // Don't build indexes
    reconnectTries: 30, // Retry up to 30 times
    reconnectInterval: 500, // Reconnect every 500ms
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0
  }
const connectWithRetry = () => {
  console.log('MongoDB connection with retry')
  mongoose.connect(DB_URL, options_mongoose).then(()=>{
    console.log('MongoDB is connected')
  }).catch(err=>{
    console.log('MongoDB connection unsuccessful, retry after 5 seconds.')
    setTimeout(connectWithRetry, 5000)
  })
}
connectWithRetry();
console.log(process.env.NODE_ENV);


app.use(cors())
app.use('/api', routes)
app.use('/map', function(req, res){
	res.render('index')
})
app.listen(3000, (err, listen) => {
	if(err){
		console.log(err)
	}
	else
	{
		console.log("Running at port 3000")
	}
})

module.exports = app;
