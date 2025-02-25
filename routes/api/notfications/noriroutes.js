const express = require("express");
const NotiController = require("../../../controller/notifications/getNotiInfo");

const router = express.Router();

router.post('/getNoti', (req, res) => {
  console.log("error when");
  const token = req.body.user_id;

  NotiController(token, req.body.limit)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;