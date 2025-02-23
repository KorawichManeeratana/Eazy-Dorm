const express = require('express');
const router = express.Router();
const conn = require('../dbconn');
//Routes
router.get('', async (req, res) => {
    const sql = `SELECT user_id FROM Users;`
    try {
        const [rows] = await conn.query(sql);
        res.render('index', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
    
})


module.exports = router;