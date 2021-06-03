const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const equipmentSchema = new Schema ({
  name: String,
  number: String,
  category: String,
  type: String,
  subtype: String,
  model: String,
  function: String,
  facility: String,
  createAt: Date,
  lastModified: Date,
  status: String
});

module.exports = Equipment = mongoose.model('equipment', equipmentSchema);
