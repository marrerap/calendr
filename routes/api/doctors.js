var express = require('express');
var router = express.Router();
const db = require('../../models')


// router.get('/', function (req, res, next) {
  
// });

// patients post statement
router.post('/', (req, res) => {
  if (!req.body || !req.body.name) {
    // respond with an error
    res.status(422).json({
      error: "Must include Doctor Name "
    })
    return
  }
  // insert new todo into DB with text, and return newly created row
  db.Doctor.create({
    name: req.body.name,
    specialty: req.body.specialty,
    location: req.body.location
  })
    .then((doctor) => {
      res.status(201).json(doctor)
    })
})



module.exports = router;
