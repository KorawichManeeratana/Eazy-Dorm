const express = require("express");
const getRoom = require("../../../controller/room/getRoom");
const rentRoomController = require("../../../controller/room/rentRoom");

const router = express.Router();

router.post('/loadroom', (req, res) => {
  getRoom(req.body.id, req.body.rent)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

router.put('/rentRoom', (req, res) => {
  rentRoomController(req.body.room_id, req.body.user_id)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;