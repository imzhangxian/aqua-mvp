const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

const accessTokenSecret = 'youraccesstokensecret';

// @post login
router.post('/', (request, response) => {
  User.findOne({ name: request.body.username })
    .then(user => {
      bcrypt.compare(request.body.password, user.password, function (err, result) {
        if (result) {
          const accessToken = jwt.sign({ username: user.username, role: user.role },
            accessTokenSecret,
            { expiresIn: '1h' });
          response.json({
            success: true,
            user: {id: user._id, name: user.name, role: user.role, org: user.organization},
            token: accessToken
          });
        } else {
          response.status(401).json({ success: false, msg: "Login failed" });
        }
      });
    })
    .catch(err => response.status(401).json({ success: false, msg: err }));

});

module.exports = router;
