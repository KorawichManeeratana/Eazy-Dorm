const express = require("express");
const router = express.Router();
const conn = require("../dbconn");
require("dotenv").config();
const jwt = require("jsonwebtoken");

//Routes
router.get("/:id/:uid", (req, res) => {
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
  let dormid = req.params.id;
  let userid = req.params.uid;
  if (userIdFromCookie != userid){
    return res.redirect('/');
  }
  res.render("addroom", { dormid, userid });
});

router.post("/process_addroom/:id/:uid", async (req, res) => {
  let dormid = req.params.id;
  let userid = req.params.uid;

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

  if (userIdFromCookie != userid){
    return res.redirect('/');
  }
  
  let formdata = {
    room_number: req.body.room_number,
    floor: req.body.floor,
    size: req.body.size,
    rent: req.body.rent,
  };
  let sql = `INSERT INTO Room (dorm_id, room_number, floor, size, rent) 
               VALUES (?, ?, ?, ?, ?);`;
  try {
    await conn.query(sql, [
      dormid,
      formdata.room_number,
      formdata.floor,
      formdata.size,
      formdata.rent,
    ]);
    res.redirect("/owndorminfo/" + dormid + "/" + userid);
    conn.releaseConnection();
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
