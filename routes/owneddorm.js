const express = require('express');
const router = express.Router();


//Routes
router.get('', (req, res) => {
    res.render('owneddorm');
})

module.exports = router;