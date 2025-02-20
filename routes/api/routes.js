const express = require('express');
const registerController = require('../../controller/accounts/register');

const router = express.Router();


router.post('/register', (req, res) => {
    const { firstname, lastname, DOB, username, password, role } = req.body;
    registerController.register(firstname, lastname, DOB, username, password, role)
        .then(result => res.status(result.status).send(result.message))
        .catch(error => res.status(500).send(error.message));
});

module.exports = router;