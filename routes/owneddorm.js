const express = require('express');
const router = express.Router();
const conn = require('../dbconn');
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.get('/:id', async (req, res) => {
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

      const userid = req.params.id;
    
      if (userIdFromCookie != userid){
        return res.redirect("/");
      }
      
    console.log("Received id:", req.params.id);
    const sql = `SELECT * FROM Dormitory WHERE owner_id = ?;`
    try {
        let userid = await req.params.id;
        const [rows] = await conn.query(sql, [req.params.id]);
        res.render('owneddorm', { data: rows, userid, del_state: false});
        conn.releaseConnection();
    } catch (error) {
        console.error("Database Error:", error);
    }
})

router.get('/adddorm/:id', async (req, res) => {
    const sql = `SELECT * FROM Dormitory WHERE owner_id = ?;`
    try {
        const [rows] = await conn.query(sql);
        res.render('adddorm', { data: rows });
        conn.releaseConnection();
    } catch (error) {
        console.error("Database Error:", error);
    }
})

module.exports = router;