const express = require('express');
const router = express.Router();


//Routes
router.get('', (req, res) => {
    res.render('bill');
})

module.exports = router;