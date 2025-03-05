const express = require("express");
const router = express.Router();
const conn = require("../dbconn");
require('dotenv').config();
const jwt = require('jsonwebtoken');

router.get("/:id/:uid", async (req, res) => {
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

  const dormid = req.params.id;
  const userid = req.params.uid;

  if (userIdFromCookie != userid){
    return res.redirect("/");
  }
  
  try {
    const sqldname = `SELECT name FROM Dormitory WHERE dorm_id = ?;`;
    const sqlRooms = `SELECT * FROM Room WHERE dorm_id = ?;`;
    const [rooms] = await conn.query(sqlRooms, [dormid]);
    const dormname = await conn.query(sqldname, dormid);
    let roomAmenities = {};
    let userName = {};
    for (let room of rooms) {
      const sqlAmenities = `SELECT a.name 
                                  FROM Amenities a 
                                  JOIN Amenroom ar ON a.amen_id = ar.amen_id 
                                  WHERE ar.room_id = ?;`;
      const sqluser = `SELECT CONCAT(u.first_name, ' ', u.last_name) as full
                             FROM Users u
                             JOIN Room r ON u.user_id = r.loger_id
                             WHERE r.room_id = ?;`;
      const [amenities] = await conn.query(sqlAmenities, [room.room_id]);
      const [username] = await conn.query(sqluser, [room.room_id]);
      roomAmenities[room.room_id] = amenities.map((a) => a.name);
      userName[room.room_id] =
        username.length > 0 ? username[0].full : "ไม่มีผู้เช่า";
    }
    res.render("owndorminfo", {
      data: rooms,
      dormid,
      roomAmenities,
      userName,
      userid,
      dname: dormname[0][0].name,
    });
    conn.releaseConnection();
  } catch (error) {
    console.error("Database Error:", error);
    res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
  }
});

router.post("/process_delroom/:id/:did/:uid", async (req, res) => {
  const roomid = req.params.id;
  const dormid = req.params.did;
  const userid = req.params.uid;
  const sql = `DELETE FROM Room WHERE room_id = ${roomid};`;
  const sql2 = `DELETE FROM Amenroom WHERE room_id = ${roomid};`;
  try {
    await conn.query(sql2);
    await conn.query(sql, [dormid]);
    res.redirect("/owndorminfo/" + dormid + "/" + userid);
    conn.releaseConnection();
  } catch (error) {
    console.error("Database Error:", error);
  }
});

router.post("/process_deldorm/:id/:uid", async (req, res) => {
  const dormId = req.params.id;
  const userid = req.params.uid;

  const sql = `DELETE FROM Dormitory WHERE dorm_id = ${dormId};`;
  const sql2 = `SELECT COUNT(room_id) as croom FROM Room WHERE dorm_id = ${dormId};`;
  try {
    let countroom = await conn.query(sql2);
    if (countroom[0][0].croom != 0) {
      res.send(
        `<script>alert("จำเป็นต้องลบห้องพักก่อนจึงจะลบหอพักได้"); window.location.href = '/owndorminfo/${dormId}/${userid}';</script>`
      );
    } else {
      const [result] = await conn.query(sql, [dormId]);
      res.redirect("/owneddorm/" + userid);
    }
    conn.releaseConnection();
  } catch (err) {
    console.error("เกิดข้อผิดพลาด:", err);
  }
});

router.post("/news/:did/:uid", async (req, res) => {
  let dormid = req.params.did;
  let userid = req.params.uid;
  let formdata = {
    content: req.body.content,
  };
  let sql = `SELECT loger_id FROM Room WHERE dorm_id = ? and loger_id is not NULL;`;
  try {
    const [rows] = await conn.query(sql, [dormid]);
    for (let i of rows) {
      let sql2 = `INSERT INTO notifications (toWho, fromWho, content) VALUE (?, ?, ?);`;
      conn.query(sql2, [i.loger_id, userid, formdata.content]);
    }
    res.redirect("/owndorminfo/" + dormid + "/" + userid);
    conn.releaseConnection();
  } catch (err) {
    console.log(err);
  }
});

router.post('/deluser/:rid/:did/:uid', async (req, res) =>{
  let dormid = req.params.did;
  let userid = req.params.uid;
  let roomid = req.params.rid;
  let sql = `UPDATE Room SET loger_id = NULL WHERE room_id = ?;`
  try {
    await conn.query(sql, [roomid]);
    res.redirect("/owndorminfo/" + dormid + "/" + userid);
    conn.releaseConnection();
  } catch (err) {
    console.log(err);
  }
})

module.exports = router;
