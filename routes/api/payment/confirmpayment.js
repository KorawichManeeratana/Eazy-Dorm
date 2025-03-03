const express = require("express");
const confirmpaymentCon = require("../../../controller/payment/confirmBill");

const router = express.Router();

router.post('/confirmPayment', (req, res) => {
  const payId = req.body.payId;

  confirmpaymentCon(payId)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;