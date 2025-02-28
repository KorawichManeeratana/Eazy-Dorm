const express = require('express')
const router = express.Router()
const conn = require('../dbconn');

router.get('', (req, res) => {
    res.render('editroom');
});


module.exports = router;