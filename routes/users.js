var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt')
const db = require('../models')


/* GET users listing. */
router.post('/register', function (req, res, next) {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(422).json({ error: "must include email and password" })
    return
  }
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      db.User.create({
        email: req.body.email,
        password: hash
      })
        .then((user) => {
          res.status(210).json(user)
        })
    })

});

router.post("/login", (req, res) => {
  if (!req.body || !req.body.email || !req.body.password) {
    res.status(422).json({ error: "must include email and password" })
  }

  // find the user
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then((user) => {
      // check user password
      bcrypt.compare(req.body.password, user.password)
        .then((success) => {
          if (success) {
            // login in the user and display a successful login message
            req.session.user = user;
            res.json({
              message: 'Successfully Logged In'
            })
          } else {
            res.status(401).json({
              error: "Incorrect Password"
            })
          }
        })
    })
})

router.get("/logout", (req, res) => {
  req.session.user = null;
  res.json({
    message: "successfully logged out"
  })
})

module.exports = router;
