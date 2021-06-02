const mongoose = require('mongoose');
const { Schema } = mongoose;

const stageSchema = new Schema({
    type: String,
    name: String,
    sequence: Number,
    influent: {},
    processing: {},
    effluent: {}
});

const plantSchema = new Schema({
    name: String,
    number: String,
    address: String,
    location: { latitude: Number, longitude: Number},
    stages: [stageSchema]
});

module.exports = Plant = mongoose.model("plant", plantSchema);
