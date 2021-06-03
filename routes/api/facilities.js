const express = require('express');
const router = express.Router();

const Facility = require('../../models/Facility');

// @get api/facilities retrieve all plants
router.get('/', (req, res) => {
  Facility.find()
    .then(facilities => res.json(facilities));
});

// @get api/facilities/plant/:number retrieve facilities of a plant
router.get('/plant/:number/:stage', (req, res) => {
  Facility.find({plant: req.params.number, stage: req.params.stage})
    .then(facilities => res.json(facilities));
});

// @post api/facilities create a new Facility
router.post('/', (req, res) => {
  const facility = new Facility({
    name: req.body.name,
    number: req.body.number,
    plant: req.body.plant,
    stage: req.body.stage
  });
  facility.save()
    .then(item => res.json(item))
    .catch(e => console.log(e));
});

// @delete api/facilities delete a facility
router.delete('/:id', (req, res) => {
  Facility.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
