const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const equipmentSchema = new Schema ({
  name: String,
  number: String,
  spec: String,
  manufacturer: String,
  stationId: Object
});

module.exports = Equipment = mongoose.model('equipment', equipmentSchema);
