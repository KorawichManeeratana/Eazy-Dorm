const express = require('express');
const router = express.Router();
const conn = require('../dbconn');
const { route } = require('./main');

router.get('/:id', async (req, res) =>{
    const dormid = req.params.id;
    const sql = `SELECT * FROM Room WHERE dorm_id = ${dormid};`
    try {
        const [rows] = await conn.query(sql);
        res.render('owndorminfo', { data: rows});
    } catch (error) {
        console.error("Database Error:", error);
    }
});



module.exports = router;