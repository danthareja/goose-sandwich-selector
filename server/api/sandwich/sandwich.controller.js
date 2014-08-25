'use strict';

var _ = require('lodash');
var Sandwich = require('./sandwich.model');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

// Get list of sandwichs
exports.index = function(req, res) {
  var meat = req.query.meat;
  var cheese = req.query.cheese;
  var sauce = req.query.sauce;

  // Did query parameters come in?
  if (!(meat || cheese || sauce)) {
    Sandwich.find(function (err, sandwichs) {
      if(err) { return handleError(res, err); }
      return res.json(200, sandwichs);
    });

  // Search for subset
  } else {
    console.log('has query params');
    // Check if cheese is any, if so don't include it in query
    if (cheese === 'any') {
      Sandwich.find({meat: meat, sauce: sauce}, function(err, sandwiches) {
        if(err) { return handleError(res, err); }
        return res.json(200, sandwiches);
      });
    } else {
      Sandwich.find({meat: meat, cheese: cheese, sauce: sauce}, function(err, sandwiches) {
        if(err) { return handleError(res, err); }
        return res.json(200, sandwiches);
      }); 
    }
  }
};

// Get a single sandwich
exports.show = function(req, res) {
  Sandwich.findById(req.params.id, function (err, sandwich) {
    if(err) { return handleError(res, err); }
    if(!sandwich) { return res.send(404); }
    return res.json(sandwich);
  });
};

// Creates a new sandwich in the DB.
exports.create = function(req, res) {
  Sandwich.create(req.body, function(err, sandwich) {
    if(err) { return handleError(res, err); }
    return res.json(201, sandwich);
  });
};

// Updates an existing sandwich in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Sandwich.findById(req.params.id, function (err, sandwich) {
    if (err) { return handleError(res, err); }
    if(!sandwich) { return res.send(404); }
    var updated = _.merge(sandwich, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, sandwich);
    });
  });
};

// Deletes a sandwich from the DB.
exports.destroy = function(req, res) {
  Sandwich.findById(req.params.id, function (err, sandwich) {
    if(err) { return handleError(res, err); }
    if(!sandwich) { return res.send(404); }
    sandwich.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}