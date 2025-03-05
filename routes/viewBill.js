const express = require("express");
const router = express.Router();
const conn = require('../dbconn');
require("dotenv").config();
const jwt = require("jsonwebtoken");

//Routes
router.get("/:uid", async (req, res) => {
  const userid = req.params.uid;
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
  if (userid != userIdFromCookie) {
    return res.redirect("/");
  }
  let sqlquery = `
  SELECT
  ph.*
FROM
  Paymenthistory AS ph
JOIN
  Room AS r ON ph.room_id = r.room_id
JOIN
  Users AS u ON r.loger_id = u.user_id
WHERE
  u.user_id = ${userid};`;
  try{
    let [rows] = await conn.query(sqlquery);
    conn.releaseConnection();
    res.render("viewBill", {data: rows});
  }catch(error){
    console.log("Error during fetching user bill! ", error)
  }
  
});

module.exports = router;
