'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

var Thing = mongoose.model('Thing', ThingSchema);

module.exports = Thing;