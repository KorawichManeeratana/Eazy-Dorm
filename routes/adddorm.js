const express = require('express');
const router = express.Router();
const conn = require('../dbconn');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });
//Routes
router.get('', (req, res) => {
    res.render('adddorm');
})

router.post('/process_addorm', upload.single('image'), async (req, res) => {
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
               VALUES (1, ?, ?, ?, ?, 'Available', ?, 0.0, ?, ?, ?, ?, ?);`;

    try {
        await conn.query(sql, [
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