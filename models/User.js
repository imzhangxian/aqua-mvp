const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create Schema
const UserSchema = new Schema ({
  name: {type: String , required: true, unique: true}, 
  password: {type: String, required: true}, // only the hash of password should be stored
  role: String, // each role has a set of permissions
  organization: String // except 'admin' role, a user could only visit objects in same org
});

module.exports = User = mongoose.model('user', UserSchema);
