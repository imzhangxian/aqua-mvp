const express = require('express');
const router = express.Router();

const Equipment = require('../../models/Equipment');

// @get api/equipments retrieve all equipments
router.get('/', (req, res) => {
  Equipment.find()
      .then(items => res.json(items));
});

// @get api/equipments/category/:category retrieve equipments of a category of machine or meter
router.get('/category/:category', (req, res) => {
  Equipment.find({category: req.params.category})
    .then(equips => res.json(equips));
});

// @post api/equipments create a new equipment
router.post('/', (req, res) => {
  const equipment = new Equipment({
    name: req.body.name,
    number: req.body.number,
    category: req.body.category,
    type: req.body.type,
    subtype: req.body.subtype,
    model: req.body.model,
    function: req.body.function,
    facility: req.body.facility,
    status: "Ready"
  });
  /** TODO insert into facility : ATOMIC */
  equipment.save()
    .then(item => res.json(item));
});

// @delete api/equipments delete a Equipment
router.delete('/:id', (req, res) => {
  Equipment.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => {
      console.log(err);
      res.status(404).json({success: false})
    });
});

module.exports = router;
