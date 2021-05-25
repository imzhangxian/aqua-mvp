const express = require('express');
const router = express.Router();

const Meter = require('../../models/Meter');

// @get api/meters retrieve all meters
router.get('/', (req, res) => {
  Meter.find()
    // .sort()
    .then(items => res.json(items));
});

// @post api/meters create a new Meter
router.post('/', (req, res) => {
  const newMeter = new Meter({
    name: req.body.name,
    number: req.body.number
  });
  newMeter.save()
    .then(item => res.json(item));
});

// @put api/meters update meter
router.put('/:id', (req, res) => {
  Meter.findByIdAndUpdate(req.params.id,
      req.body,
      {useFindAndModify: false}
    ).then(item => res.json({success: true}))
      .catch(err => res.status(404).json({success: false}));
});

// @delete api/meters delete a meter
router.delete('/:id', (req, res) => {
  Meter.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
