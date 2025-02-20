const express = require('express');
const registerController = require('../../controller/accounts/register');

const router = express.Router();

router.post('/register', (req, res) => {
    registerController(req.body)
        .then(result => res.status(result.status).send(result))
        .catch(error => res.status(500).send(error));
});

module.exports = router;