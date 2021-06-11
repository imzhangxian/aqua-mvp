const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt');

const accessTokenSecret = 'youraccesstokensecret';

// @post login
router.post('/', (req, res) => {
  User.fineOne({ name: req.body.username})
  .then(user => {
    bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
      if (res) {
        const accessToken = jwt.sign({ username: user.username, role: user.role }, 
          accessTokenSecret, 
          { expiresIn: '1h' });
        res.json({
          accessToken
        });
      } else {
        res.status(401).json({ msg: "Login failed" });
        }
    });
  })
  .catch(err => res.status(401).json({success: false, msg: err}));
  
});

module.exports = router;
