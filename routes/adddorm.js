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
router.get('', async (req, res) => {
    const sql = `SELECT user_id FROM Users;`
    try {
        const [rows] = await conn.query(sql);
        res.render('adddorm', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
})

router.post('/process_addorm', upload.single('image'), async (req, res) => {
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
        rent1: req.body.rent1,
        rent2: req.body.rent2,
        contact: req.body.contact,
        other_contact: req.body.other_contact,
        electric_pay: req.body.electric_pay,
        water_pay: req.body.water_pay,
        image: req.file ? req.file.filename : null
    };
    let rent = formdata.rent1 + '-' + formdata.rent2;
    let sql = `INSERT INTO Dormitory(owner_id, name, detail, address, room, status, rent, rating, phone_contact, other_contact, electric_pay, water_pay, dorm_pic) 
               VALUES (?, ?, ?, ?, ?, 'Available', ?, 0.0, ?, ?, ?, ?, ?);`;
    try {
        const response = await fetch("http://localhost:3000/api/cookieInfo", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: token }),
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch user info');
        }
        const data = await response.json();      
        decodedata = data.decoded;
        console.log("userID :", decodedata.userID);
        

        if (!decodedata.userID) {
            return res.status(400).json({ error: "User ID missing in token" });
        }
        await conn.query(sql, [
            decodedata.userID,
            formdata.name,
            formdata.detail,
            formdata.address,
            formdata.room,
            rent,
            formdata.contact,
            formdata.other_contact,
            formdata.electric_pay,
            formdata.water_pay,
            formdata.image
        ]);
        res.send(`<script>alert("บันทึกข้อมูลสำเร็จ"); window.location.href = '/adddorm';</script>`);
    } catch (err) {
        console.error("Error :", err);
    }
});


module.exports = router;