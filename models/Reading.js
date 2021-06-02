const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const readingSchema = new Schema ({
  name: String,
  deviceType: String,
  deviceId: String,
  readings: Number,
  unit: String, 
  createAt: Date
});

module.exports = Reading = mongoose.model('Reading', readingSchema);
