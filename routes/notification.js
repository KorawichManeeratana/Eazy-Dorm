const express = require('express');
const router = express.Router();


//Routes
router.get('/:id', (req, res) => {
    res.render('notification', {id: req.params.id});
})

module.exports = router;
