const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

//Routes
router.get('/:did', async (req, res) => {
    let dormid = req.params.did;
    let sql = `SELECT r.room_number, rp.detail, rp.report_id ,u.phone FROM Report rp
        JOIN Room r ON rp.room_id = r.room_id JOIN Users u ON r.loger_id = u.user_id WHERE r.dorm_id = ${dormid};`;
    try {
        const [rows] = await conn.query(sql, [dormid]);
        res.render('reportnoti', { data: rows, dormid });
    } catch (err) {
        console.error(err);
    }
});
router.post('/success/:rid/:did', async (req, res) => {
    let dormid = req.params.did;
    let report_id = req.params.rid;
    let sql = `DELETE FROM Report WHERE report_id = ${report_id};`;
    try {
        await conn.query(sql, [report_id]);
        res.redirect('/reportnoti/'+dormid);
        conn.releaseConnection();
    } catch (err) {
        console.error(err);
    }
});

module.exports = router;