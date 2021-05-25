const express = require('express');
const router = express.Router();

const Station = require('../../models/Station');

// @get api/meters retrieve all meters
router.get('/', (req, res) => {
  Station.find()
    // .sort()
    .then(stations => res.json(stations));
});

// @post api/meters create a new Meter
router.post('/', (req, res) => {
  const newStation = new Station({
    name: req.body.name,
    number: req.body.number,
    lat: req.body.latitude,
    longt: req.body.longitude,
    warninglevel: req.body.warninglevel
  });
  newStation.save()
    .then(station => res.json(station));
});

module.exports = router;
