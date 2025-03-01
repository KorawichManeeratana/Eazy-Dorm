const express = require("express");
const updateNoti = require("../../../controller/notifications/updateNoti");

const router = express.Router();

router.post('/update_notification_status', (req, res) => {
  const notiID = req.body.notificationId;

  updateNoti(notiID)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;