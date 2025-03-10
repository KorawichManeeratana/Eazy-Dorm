const express = require("express");
const notiandpaymentCon = require("../../../controller/payment/addbillandnoti");

const router = express.Router();

router.post('/sendpayment', (req, res) => {
  const roomid = req.body.roomid;
  const dormname = req.body.dormname;
  const totalrent = req.body.totalrent;
  const waterBill = req.body.waterBill;
  const elecBill = req.body.elecBill;

  notiandpaymentCon(roomid, dormname, totalrent, waterBill, elecBill)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;