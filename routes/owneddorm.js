const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

//Routes
router.get('', async (req, res) => {
    const sql = `SELECT * FROM Dormitory WHERE owner_id = 1;`
    try {
        const [rows] = await conn.query(sql);
        res.render('owneddorm', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
    // conn.query(sql, function (err, result) {
    //     if (err) {
    //         console.error("Database Error:", err);
    //         return res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    //     };
    //     console.log("Query Result:", result);
    //     res.render('owneddorm', { data: result })
    // })
})

module.exports = router;