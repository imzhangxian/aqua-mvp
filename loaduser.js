const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcrypt');

const db =
    "mongodb://localhost:27017/mvp";

mongoose
    .connect(db,
        { useNewUrlParser: true, useUnifiedTopology: true });
console.log("DB connected.");

const user = new User({
    name: "admin@aqua.com",
    password: "123",
    role: "admin",
    organization: "site"
  });

  bcrypt.hash(user.password, 10, (err, hash) => {
    new User({
        name: user.name,
        password: hash,
        role: user.role,
        organization: user.organization
    })
    .save()
    .then(() => console.log('Success!'))
    .catch(e => console.log('Failed: ' + e));
});

