const router = require("express").Router();
const GameLog = require("../db").import("../models/gamelog");

router.post("/createlisting", (req, res) => {
  GameLog.create({
    title: req.body.title,
    backgroundImage: req.body.backgroundImage,
    genre: req.body.genre,
    rating: req.body.rating,
    platform: req.body.platform,
    releaseDate: req.body.releaseDate,
    owner: req.user.id,
    comment: req.body.comment
  })
    .then(result => res.status(200).json(result))
    .catch(err => res.json({ error: err }));
});

router.get("/showlistings", (req, res) => {
  GameLog.findAll({ where: { owner: req.user.id } })
    .then(result => res.status(200).json(result))
    .catch(err => res.json({ error: err }));
});

router.put("/updatelisting/:id", (req, res) => {
  GameLog.update(req.body, { where: { id: req.params.id, owner: req.user.id } })
    .then(result =>
      res.status(200).json({ result: result, message: "update successful" })
    )
    .catch(err => res.json({ error: err }));
});

router.delete("/deletelisting/:id", (req, res) => {
  GameLog.update(req.body, { where: { id: req.params.id, owner: req.user.id } })
    .then(result =>
      res.status(200).json({ result: result, message: "delete successful" })
    )
    .catch(err => res.json({ error: err }));
});

module.exports = router;
