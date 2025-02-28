const express = require('express')
const router = express.Router()

router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.render('selectroom', {id: id});
})

module.exports = router;