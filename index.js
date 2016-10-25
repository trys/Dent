var express = require('express');
var compression = require('compression');
var dust = require('express-dustjs');
var path = require('path');
var fs = require('fs');
var controllers = {};
var app = express();
app.use(compression());

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
    var fileName = file.replace('.js', '');
    controllers[fileName] = require('./controllers/' + file)[fileName];
  }
});

app.engine('dust', dust.engine());
app.set('view engine', 'dust');
app.set('views', path.resolve(__dirname, './views'));
app.use(express.static( __dirname + '/public' ));

app.get('/', controllers.index);
app.get('*', controllers.error);

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});