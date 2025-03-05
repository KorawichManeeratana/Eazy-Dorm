const express = require("express");
const getDorm = require("../../../controller/dorm/getDorm");
const updateRating = require("../../../controller/dorm/updateRating");

const router = express.Router();

router.post('/loaddorm', (req, res) => {
  getDorm(req.body.text)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

router.put('/updateRating', (req, res) => {
  updateRating(req.body.dorm_id)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;