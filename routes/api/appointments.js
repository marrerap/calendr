const express = require('express');
const db = require('../../models')
const router = express.Router();

router.get('/', (req, res, next) => {
  db.Appointment.findAll({
      include: [db.Patient, db.Doctor]
  })
    .then((appointments) => {
        res.json(appointments)
    })
});



module.exports = router;
