const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const FacilitySchema = new Schema ({
  name: String,
  number: String,
  address: String,
  lat: Number,
  longt: Number,
  warninglevel: Number // 0-100 warning level
});

module.exports = Facility = mongoose.model('facility', FacilitySchema);
