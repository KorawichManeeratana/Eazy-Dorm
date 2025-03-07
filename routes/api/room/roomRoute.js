const express = require("express");
const getRoom = require("../../../controller/room/getRoom");
const rentRoomController = require("../../../controller/room/rentRoom");
const getRoomFloors = require("../../../controller/room/getRoomFloors");
const getAmen = require("../../../controller/room/getAmen");

const router = express.Router();

router.post('/loadroom', (req, res) => {
  getRoom(req.body.id, req.body.rent, req.body.floors, req.body.amens)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

router.put('/rentRoom', (req, res) => {
  rentRoomController(req.body.room_id, req.body.user_id)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

router.post('/loadroomfloors', (req, res) => {
  getRoomFloors(req.body.id)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

router.post('/loadamenities' , (req, res) => {
  getAmen()
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
})

module.exports = router;