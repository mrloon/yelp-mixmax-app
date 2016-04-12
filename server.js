var express = require('express');
var app = express();
var sync = require('synchronize');
var bodyParser = require('body-parser');
var cors = require('cors');

app.use(function(req, res, next) {
  sync.fiber(next);
});

var corsOptions = {
  origin: /^[^.\s]+\.mixmax\.com$/,
  credentials: true
};

app.get('/typeahead', cors(corsOptions), require('./typeahead'));
app.get('/resolver', cors(corsOptions), require('./resolver'));

app.listen(process.env.PORT || 3411);
