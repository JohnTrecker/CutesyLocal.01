var mongoose = require('mongoose');
var axios = require('axios');
// ================================
// TODO: verify case sensativity update apiRouter methods
// ================================
var Venues = require('./api');
var keys = require('../../config/config.json');

// var Users = require('./api');
// var axios = require('axios');
mongoose.Promise = require('bluebird');

// TODO: [ ] verify case sensativity for `require('/api')`
//       [ ] verify status / res order
//       [ ] find and assign appropriate endpoint to variable
//           for each controller method, then call `.find()`, etc.
//       [ ] update all status codes
//       [ ] Should updateOne append to or replace table data?

exports.retrieve = function (req, res) {
  Venues.find({}, function(error, venues) {
    if (error) {
      console.log('error retrieving venues: ', error);
      res.send(404);
    } else {
      res.sendStatus(200).json(venues);
    }
  });
};

exports.createOne = function (req, res) {
  var newVenue = req.body;
  Venues.create(newVenue, function(error, newVenue) {
    if (error) {
      console.log('error creating one: ', error);
      res.send(404);
    } else {
      res.sendStatus(201).json(newVenue);
    }
  });
};

exports.delete = function (req, res) {
  Venues.remove({}, function(error, venues) {
    if (error) {
      console.log('error deleting venues: ', error);
      res.send(404);
    } else {
      res.sendStatus(204).json(venues);
    }
  });
};

exports.retrieveOne = function (req, res) {
  // ======================================================================
  // Use req.params.number to pull number passed into URL as "/api/:number"
  // ======================================================================
  // N.b. req.params.number.replace(':number', '') === req.params.number
  var number = req.params.number;
  Venues.findOne({ number: number }, function(error, venue) {
    if (error) {
      console.log('error retrieving one: ', error);
      res.send(404);
    } else {
      res.sendStatus(200).json(venue);
    }
  });
};

exports.updateOne = function (req, res) {
  var number = req.params.number;
  var update = req.body;
  Venues.findOneAndUpdate({ number: number }, update, { new: true }, function(error, venue) {
    if (error) {
      console.log('error updating one: ', error);
      res.send(404);
    } else {
      res.sendStatus(200).json(venue);
    }
  });
};


exports.deleteOne = function (req, res) {
  var number = req.params.number;
  Venues.findOneAndRemove({ number: number }, function(error, venue) {
    if (error) {
      console.log('error deleting one: ', error);
      res.send(404);
    } else {
      res.sendStatus(500).json(venue);
    }
  });
};

exports.retrieveKey = function (req, res) {
  var key = keys.mapboxgl_access_token;
  if (key === undefined) {
    console.log('error retrieving key');
    res.send(404);
  } else {
    res.json(key);
  }
};

exports.retrieveYelp = function (req, res) {
  // TODO: make yelp request dynamic
  var yelp_url = 'https://api.yelp.com/v3/businesses/search?term=dogs+allowed&latitude=37.775712&longitude=-122.413692&radius=8000&limit=5&categories=restaurants';
  var token = 'Bearer ' + keys.yelp_api_token;

  axios({
    url: yelp_url,
    method: 'get',
    headers: { authorization: token }
  })
  .then(function(result){
    console.log('success retreiving yelp data on back end');
    if (result === undefined) {
      // console.log('Back end retrieved yelp data is undefined :\n', result);
      res.send(404);
    } else {
      // console.log('Back end retrieved yelp data:\n', result.data);
      res.json(result.data);
    }
  })
  .catch(function(error){
    console.log('error retrieving yelp data on back end:\n', error)
  })

};

