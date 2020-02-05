const router = require("express").Router();
const User = require("../db").import("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  User.create({
    fullName: req.body.fullName,
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 13)
  })
    .then(user => {
      let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: 60 * 60 * 24
      });

      res.json({
        user: user,
        message: "user created!",
        sessionToken: token
      });
    })
    .catch(err => res.send(500, { error: err }));
});

router.post("/signin", (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, matches) => {
        if (matches) {
          let token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: 60 * 60 * 24
          });
          res.json({
            user: user,
            message: "successfully authenticated user",
            sessionToken: token
          });
        } else {
          res.status(502).send({ error: "bad gateway. passwords don't match" });
        }
      });
    } else {
      res.status(500).send({ error: "failed to authenticate. No such user" });
    }
  }),
    err => res.status(501).send({ error: "failed to process" });
});

module.exports = router;
