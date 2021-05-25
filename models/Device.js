const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const DeviceSchema = new Schema ({
  name: String,
  number: String,
  spec: String,
  manufacturer: String,
  stationId: Object
});

module.exports = Device = mongoose.model('device', DeviceSchema);
