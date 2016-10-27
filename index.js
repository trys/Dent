var express = require('express');
var compression = require('compression');
var dust = require('express-dustjs');
var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var controllers = {};
var app = express();

// Gzip
app.use(compression());

// Pull in controllers
fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    var fileName = file.replace('.js', '');
    var src = require('./controllers/' + file);
    for (var key in src) {
    	if (src.hasOwnProperty(key)) controllers[key] = src[key];
    }
  }
});

// Posts
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Dust & Static files
app.engine('dust', dust.engine({
	useHelpers: true
}));
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));
app.use('/public', express.static('public'));




// Router
app.get('/', controllers.comments);
app.post('/', controllers.commentsPost);
app.get('*', controllers.error);



// Start up the server
app.listen(3000);