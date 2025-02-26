const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

router.post('/process_del/:id/:uid', async (req, res) => {
    console.log("POST /process_del/:id ถูกเรียกใช้"); 
    const dormId = req.params.id;
    console.log("กำลังลบหอพัก ID:", dormId);

    const sql = `DELETE FROM Dormitory WHERE dorm_id = ?;`;

    try {
        const [result] = await conn.query(sql, [dormId]); 
        console.log("ลบสำเร็จ");
        res.send(`<script>alert("ลบข้อมูลหอพักสำเร็จ"); window.location.href = '/owneddorm/${req.params.uid}';</script>`);
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
    }
});

router.get('/:id', async (req, res) => {
    console.log("Received id:", req.params.id);
    const sql = `SELECT * FROM Dormitory WHERE owner_id = ?;`
    try {
        let userid = await req.params.id;
        const [rows] = await conn.query(sql, [req.params.id]);
        res.render('owneddorm', { data: rows, userid, del_state: false});
    } catch (error) {
        console.error("Database Error:", error);
    }
})

router.get('/adddorm/:id', async (req, res) => {
    const sql = `SELECT * FROM Dormitory WHERE owner_id = ?;`
    try {
        const [rows] = await conn.query(sql);
        res.render('adddorm', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
})

module.exports = router;