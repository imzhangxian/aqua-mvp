const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const FacilitySchema = new Schema ({
  name: String,
  number: String,
  plant: String,
  stage: String, 
  equipments: [
    {
      sequence: Number, 
      purpose: String, 
      number: String
    }
  ]
});

module.exports = Facility = mongoose.model('facility', FacilitySchema);
