const express = require('express')
const router = express.Router()
const conn = require('../dbconn');

router.get('/:did', async (req, res) => {
    const dormid = req.params.did;
    let sql = `SELECT
    ph.*,
    r.room_number
FROM
    Paymenthistory ph
JOIN
    Room r ON ph.room_id = r.room_id
JOIN
    Dormitory d ON r.dorm_id = d.dorm_id
WHERE
    d.dorm_id = ? AND ph.status = 'unpaid'
ORDER BY
    r.room_number;`;

    let sqlv2 = `SELECT name FROM Dormitory WHERE dorm_id = ?`
    try {
        const [rows] = await conn.query(sql, dormid);
        const dormname = await conn.query(sqlv2, dormid);
        console.log(rows);
        console.log(dormname[0]);
        conn.releaseConnection();
        res.render('allBill', { data: rows, dname: dormname[0]});
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;