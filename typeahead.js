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

// The Type Ahead API.
module.exports = function(req, res) {
  var term = req.query.text.trim();
  if (!term) {
    res.json([{
      title: '<i>(enter a search term)</i>',
      text: ''
    }]);
    return;
}

var url = 'https://api.yelp.com/v2/search';
var location = 'San Francisco';

  var response;
  yelp.search({term: term, location: location, limit: 10}, function(err, data) {
    if (err) return err;
    var results = _.chain(data.businesses)
    .map(function(businesses) {
      return {
        title: '<B>Name of Restaurant:</B> ' + businesses.name + '<br><B>Neighborhood:</B> ' + businesses.location.neighborhoods[0],
        text: businesses.id
      };
    }) 
    .value();

  if (results.length === 0) {
    res.json([{
      title: '<i>(no results)</i>',
      text: ''
    }]);
  } else {
    res.json(results);
  }
});
};
