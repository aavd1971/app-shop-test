
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes/API');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
//var mongo = require('./mongo');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);//console.log('env.PORT',process.env.PORT);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/resource', routes.getData);
app.post('/resource', routes.insertData);
app.put('/resource/:id', routes.editData);
app.delete('/resource/:id', routes.deleteData);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
