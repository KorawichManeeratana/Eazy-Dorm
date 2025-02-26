const express = require("express");
const getDorm = require("../../../controller/dorm/getDorm");

const router = express.Router();

router.post('/loaddorm', (req, res) => {
  getDorm(req.body.text)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;