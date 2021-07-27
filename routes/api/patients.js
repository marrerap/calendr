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
      error: "Must include Patient Name "
    })
    return
  }
  // insert new todo into DB with text, and return newly created row
  db.Patient.create({
    name: req.body.name,
    birthdate: req.body.birthdate,
    covid: req.body.covid,
    phone: req.body.phone
  })
    .then((patient) => {
      res.status(201).json(patient)
    })
})


router.post('/:id/appointment', (req, res) => {
  if (!req.body || !req.body.time) {
    res.status(422).json({
      error: "Please include time."
    })
    return
  }

  db.Patient.findByPk(req.params.id)
  .then((patient) => {
    if (!patient) {
      res.status(404).json({
        error: "No patient Found"        
      })
      return
    }
    patient.createAppointment({
      time: req.body.time
    })
    .then((appointment) => {
      res.status(201).json(appointment)
    })
  })
})

module.exports = router;
