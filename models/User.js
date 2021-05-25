const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema ({
  name: String,
  password: String,
  permissions: Number // HEX number - each bit represents a permission
});

module.exports = User = mongoose.model('user', UserSchema);
