const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const MonitoringDataSchema = new Schema ({
  name: String,
  deviceType: String,
  deviceId: String,
  readings: Number,
  unit: String, 
  createAt: Date
});

module.exports = MonitoringData = mongoose.model('monitoringdata', MonitoringDataSchema);
