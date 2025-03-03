const express = require('express');
const router = express.Router();


//Routes
router.get('/:qrpid', (req, res) => {
    res.render('qrbill');
})

module.exports = router;