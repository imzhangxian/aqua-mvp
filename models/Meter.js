const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const MeterSchema = new Schema ({
  name: String,
  number: String,
  spec: String,
  manufacturer: String
});

module.exports = Meter = mongoose.model('meter', MeterSchema);
