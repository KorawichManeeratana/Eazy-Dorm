const express = require('express');
const router = express.Router();


//Routes
router.get('', (req, res) => {
    res.render('login');
})

module.exports = router;