const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const accessTokenSecret = 'youraccesstokensecret';

// @post login
router.post('/', (req, res) => {
  const user = {
    username: req.body.username,
    password: req.body.password,
    role: 'admin'
  }
  if (user.username === "joseph" && user.password === "123") {
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

module.exports = router;
