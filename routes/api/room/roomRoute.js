const express = require("express");
const getDorm = require("../../../controller/room/getRoom");

const router = express.Router();

router.post('/loadroom', (req, res) => {
  getDorm(req.body.id)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;