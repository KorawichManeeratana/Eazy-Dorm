const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

//Routes
router.get('/:id', async (req, res) => {
    let dormid = req.params.id;
    let sql = `
    SELECT r.room_id, r.room_number, r.status, r.rent, IFNULL(CONCAT(u.first_name, ' ', u.last_name), 'ไม่มีผู้เช่า') AS full 
    FROM Room r 
    LEFT JOIN Users u ON r.loger_id = u.user_id 
    WHERE r.dorm_id = ${dormid};`;
    let sql2 = `SELECT * FROM Dormitory WHERE dorm_id = ${dormid};`
    try {
        const [rows] = await conn.query(sql);
        const [dormname] = await conn.query(sql2);
        res.render('addpayment', { data:rows, data2:dormname });
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;