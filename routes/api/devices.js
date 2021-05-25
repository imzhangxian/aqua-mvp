const express = require('express');
const router = express.Router();

const Device = require('../../models/Device');

// @get api/meters retrieve all meters
router.get('/', (req, res) => {
    Device.find()
      // .sort()
      .then(items => res.json(items));
  });  

module.exports = router;
