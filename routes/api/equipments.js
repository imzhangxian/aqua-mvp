const express = require('express');
const router = express.Router();

const Equipment = require('../../models/Equipment');

// @get api/equipment retrieve all meters
router.get('/', (req, res) => {
  Equipment.find()
      // .sort()
      .then(items => res.json(items));
  });  

module.exports = router;
