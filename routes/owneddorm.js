const express = require('express');
const router = express.Router();
const conn = require('../dbconn');



router.get('/:id', async (req, res) => {
    console.log("Received id:", req.params.id);
    const sql = `SELECT * FROM Dormitory WHERE owner_id = ?;`
    try {
        const [rows] = await conn.query(sql, [req.params.id]);
        res.render('owneddorm', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
})





router.get('/adddorm/:id', async (req, res) => {
    const sql = `SELECT * FROM Dormitory WHERE owner_id = ?;`
    try {
        const [rows] = await conn.query(sql);
        res.render('addroom', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
})

module.exports = router;