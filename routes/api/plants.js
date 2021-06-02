const express = require('express');
const router = express.Router();

const Plant = require('../../models/Plant');

// @get api/plants retrieve all plants
router.get('/', (req, res) => {
  Plant.find()
    // .sort()
    .then(plants => res.json(plants));
});

// @get api/plants/:number retrieve a plant by number
router.get('/:number', (req, res) => {
  Plant.findOne({number: req.params.number})
    .then(plant => res.json(plant));
});

// @get api/plants/:number/stages retrieve all stages of a plant by number
router.get('/:number/stages', (req, res) => {
  Plant.findOne({number: req.params.number})
    .then(plant => res.json(plant.stages));
});

// @post api/plants create a new plant
router.post('/', (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    number: req.body.number,
    address: req.body.address,
    location: {
      latitude: req.body.latitude,
      longitude: req.body.longitude
    }
  });
  let seq = 1;
  req.body.stages.map(stage => {
    plant.stages.push({
      type: stage,
      name: stage + " Stage", 
      sequence: seq,
      influent: {},
      processing: {},
      effluent: {}
    });
    seq ++;
  });
  plant.save()
    .then(item => res.json(item));
});

// @delete api/plants delete a plant
router.delete('/:id', (req, res) => {
  Plant.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
