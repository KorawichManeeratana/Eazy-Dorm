const express = require('express');
const router = express.Router();
const conn = require('../dbconn');
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

//Routes
router.get('/:id/:uid', async (req, res) => {
    const sql = `SELECT * FROM Dormitory WHERE dorm_id = ?;`
    try {
        const [rows] = await conn.query(sql, [req.params.id]);
        console.log(rows);
        res.render('editdorm', { data: rows[0] });
    } catch (error) {
        console.error("Error :", error);
    }
});


router.post('/process_edit/:id/:uid', upload.single('image'), async (req, res) => {
    console.log("heer")
    const token = req.body.token || req.headers.authorization?.split(" ")[1] || req.cookies?.access_token;
    console.log("Extracted token:", token);
    if (!token) {
        return res.status(401).json({ error: "Token not provided" });
    }
    let formdata = {
        name: req.body.name,
        detail: req.body.detail,
        address: req.body.address,
        room: req.body.room,
        rent1: req.body.rent_min,
        rent2: req.body.rent_max,
        contact: req.body.phone_contact,
        other_contact: req.body.other_contact,
        electric_pay: req.body.electric_pay,
        water_pay: req.body.water_pay,
        image: req.file ? req.file.filename : null
    };
    let rent = formdata.rent1 + '-' + formdata.rent2;
    let sql = `UPDATE Dormitory SET 
    name = '${formdata.name}',
    detail = '${formdata.detail}',
    address = '${formdata.address}',
    room = ${formdata.room},
    rent = ${rent},
    phone_contact = '${formdata.contact}',
    other_contact = '${formdata.other_contact}',
    electric_pay = ${formdata.electric_pay},
    water_pay = ${formdata.water_pay},
    dorm_pic = '${formdata.image}'
    WHERE dorm_id = ${req.params.id};`;
    try {
        await conn.query(sql);
        res.send(`<script>alert("แก้ไขข้อมูลสำเร็จ"); window.location.href = '/owneddorm/${req.params.uid}';</script>`);
    } catch (err) {
        console.error("Error :", err);
    }
});


module.exports = router;