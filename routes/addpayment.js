const express = require('express');
const router = express.Router();
const conn = require('../dbconn');
require('dotenv').config();
const jwt = require('jsonwebtoken');

//Routes
router.get('/:id', async (req, res) => {
    let dormid = req.params.id;
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
    let sql = `SELECT r.room_id, r.room_number, r.rent, IFNULL(CONCAT(u.first_name, ' ', u.last_name), 'ไม่มีผู้เช่า') AS full 
              FROM Room r 
              LEFT JOIN Users u ON r.loger_id = u.user_id 
              WHERE r.dorm_id = ${dormid};`;
              let sql2 = `SELECT * FROM Dormitory WHERE dorm_id = ${dormid};`
    try {
        const [rows] = await conn.query(sql);
        const [dormname] = await conn.query(sql2);
        if (dormname[0].owner_id != userIdFromCookie){
            return res.redirect('/');
        }
        res.render('addpayment', { data:rows, data2:dormname });

        conn.releaseConnection();
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;