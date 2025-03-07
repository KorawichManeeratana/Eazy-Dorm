const express = require('express')
const router = express.Router()
const conn = require('../dbconn');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.get('/:did', async (req, res) => {
    const dormid = req.params.did;
    const accessToken = req.cookies.access_token;
    const SECRET_KEY = process.env.ACCESSKEYID;
    let userIdFromCookie = null;
  
    if (accessToken) {
      try {
        const decoded = jwt.verify(accessToken, SECRET_KEY);
        userIdFromCookie = decoded.userID;
      } catch (error) {
        console.error("Error decoding JWT:", error);
        userIdFromCookie = null;
      }
    }
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

    let sqlv2 = `SELECT name, owner_id FROM Dormitory WHERE dorm_id = ?`
    try {
        const [rows] = await conn.query(sql, dormid);
        const dormname = await conn.query(sqlv2, dormid);
        conn.releaseConnection();
        if (dormname[0][0].owner_id != userIdFromCookie){
            return res.redirect('/');
        }
        res.render('allBill', { data: rows, dname: dormname[0]});
    } catch (err) {
        console.log(err);
    }

});

module.exports = router;