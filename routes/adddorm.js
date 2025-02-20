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


router.post('/process_addorm', upload.single('image'), (req, res) => {
    let formdata = {
        name: req.body.name,
        detail: req.body.detail,
        address: req.body.address,
        room: req.body.room,
        rent: req.body.rent,
        contact: req.body.contact,
        other_contact: req.body.other_contact,
        electric_pay: req.body.electric_pay,
        water_pay: req.body.water_pay,
        image: req.file ? req.file.filename : null
    };
    console.log(formdata);
    let sql = `INSERT INTO Dormitory(owner_id, name, detail, address, room, status, rent, rating, phone_contact, other_contact, electric_pay, water_pay, dorm_pic) 
               VALUES (1, '${formdata.name}', '${formdata.detail}', '${formdata.address}', ${formdata.room}, 'Available', '${formdata.rent}', 0.0, '${formdata.contact}', 
               '${formdata.other_contact}', ${formdata.electric_pay}, ${formdata.water_pay}, '${formdata.image}');`;
    console.log(sql);
    conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("เพิ่มข้อมูลสำเร็จ");
        res.send(`<script>alert("เพิ่มข้อมูลสำเร็จ"); window.location.href = '/adddorm';</script>`);
    });
});

module.exports = router;