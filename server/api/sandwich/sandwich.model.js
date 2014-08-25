'use strict';

var sandwichData = require('./sandwichData.js');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var SandwichSchema = new Schema({
  name: String,
  bread: String,
  meat: [String],
  cheese: String,
  sauce: [String],
  veg: [String]
});

var Sandwich = mongoose.model('Sandwich', SandwichSchema);

Sandwich.create(sandwichData, function(err) {
  if (err) console.log(err);
  console.log("New sandwiches created!");
});

module.exports = Sandwich;