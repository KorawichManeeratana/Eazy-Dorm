const express = require("express");
const CookiesController = require("../../../controller/cookies/Decode");

const router = express.Router();

router.post('/cookieInfo', (req, res) => {
  const token = req.body.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  CookiesController(token)
  .then(result => res.status(result.status).send(result))
  .catch(error => res.status(500).send(error));
});

module.exports = router;
