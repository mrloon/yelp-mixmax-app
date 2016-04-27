var sync = require('synchronize');
var request = require('request');
var _ = require('underscore');
var Yelp = require('yelp');

// Utilizes my own yelp API keys and a node library to do most of the grunt work related to searching yelp
var yelp = new Yelp({
  consumer_key: ,
  consumer_secret: ,
  token: ,
  token_secret: ,
});

// The API that returns the in-email representation.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  var response
  yelp.business(term, function(err, data) {
    console.log('Error');
    if (err) {
      console.log(err);
      res.send('Error');
      return err;
    }
    var html = '<img style="max-width:100%"; src="' + data.snippet_image_url + '"/> <br> ' + data.name + '<br> <a href=' + data.url +'>link text</a>';
    console.log(html);
    console.log(data.name);
    res.json({
      body: html,
      subject: data.name
    });
  });
};
