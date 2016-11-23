var mongoose = require('mongoose');
// ================================
// TODO: verify case sensativity update apiRouter methods
// ================================
var Venues = require('./api');
var keys = require('../../config/config.json');

// var Users = require('./api');
// var axios = require('axios');
mongoose.Promise = require('bluebird');

// TODO: [ ] verify case sensativity for `require('/api')`
//       [ ] find and assign appropriate endpoint to variable
//           for each controller method, then call `.find()`, etc.
//       [ ] update all status codes
//       [ ] Should updateOne append to or replace table data?

exports.retrieve = function (req, res) {
  Venues.find({}, function(error, venues) {
    if (error) {
      console.log('error retreiving venues: ', error);
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
  console.log('*********** req.data *********', req.data);
  key = req.data;
  if (key === undefined) {
    console.log('error retreiving key');
    res.send(404);
  } else {
    res.sendStatus(200).json(key);
  }
};
