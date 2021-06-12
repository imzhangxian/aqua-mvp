const express = require('express');
const router = express.Router();

const User = require('../../models/User');
const bcrypt = require('bcrypt');

// @post api/users create a new user
router.post('/', (req, res) => {
    const pwdplain = req.body.password;
    bcrypt.hash(pwdplain, 10, (err, hash) => {
        new User({
            name: req.body.name,
            password: hash,
            role: req.body.role,
            organization: req.body.organization
        })
            .save()
            .then(() => res.json({success: true}))
            .catch(e => res.status(409).json({success: false, msg: e}));
    });

});

// @delete api/plants delete a plant
router.delete('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
