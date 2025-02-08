const express = require('express')
const router = express.Router()

router.get('', (req, res) => {
    res.render('showproblem');
})

module.exports = router;