const express = require("express");
const router = express.Router();
const conn = require("../dbconn");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});


const upload = multer({ storage: storage });

router.get("/:rid/:uid", async (req, res) => {
  const roomid = req.params.rid;
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

  if (userIdFromCookie != req.params.uid) {
    return res.redirect("/");
  }

  let sql = `SELECT * FROM Room WHERE room_id = ${roomid};`;
  try {
    const [rows] = await conn.query(sql, [roomid]);
    res.render("editroom", { data: rows[0], userid });
  } catch (err) {
    console.log(err);
  }
});
router.post("/process_editroom/:id/:uid", upload.single('image'), async (req, res) => {
  let roomId = req.params.id;
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

  if (userIdFromCookie != userid) {
    return res.redirect("/");
  }

  let formdata = {
    room_number: req.body.room_number,
    floor: req.body.floor,
    size: req.body.size,
    rent: req.body.rent,
    image: req.file ? req.file.filename : null
  };
  let sql;
  if (formdata.image == null) {
    sql = `UPDATE Room 
        SET room_number = '${formdata.room_number}', 
        floor = ${formdata.floor}, 
        size = ${formdata.size}, 
        rent = ${formdata.rent}
        WHERE room_id = ${roomId};`;
  } else {
    sql = `UPDATE Room 
        SET room_number = '${formdata.room_number}', 
        floor = ${formdata.floor}, 
        size = ${formdata.size}, 
        rent = ${formdata.rent},
        room_img = '${formdata.image}'
        WHERE room_id = ${roomId};`;
  }
  
  let sqldorm = `SELECT dorm_id FROM Room WHERE room_id = ${roomId};`;
  try {
    dorm = await conn.query(sqldorm);
    let sqlDel = `DELETE FROM Amenroom WHERE room_id = ${roomId};`;
    await conn.query(sqlDel);

    let facilities = req.body.facilities;
    if (facilities && !Array.isArray(facilities)) {
      facilities = [facilities];
    }

    if (facilities && facilities.length > 0) {
      let values = facilities
        .map((amen_id) => `(${roomId}, ${amen_id})`)
        .join(",");
      let sql2 = `INSERT INTO Amenroom (room_id, amen_id) VALUES ${values};`;
      await conn.query(sql2);
    }

    await conn.query(sql);
    res.redirect("/owndorminfo/" + dorm[0][0].dorm_id + "/" + userid);
    conn.releaseConnection();
  } catch (err) {
    console.log(err);
    res.status(500).send("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
  }
});

module.exports = router;
