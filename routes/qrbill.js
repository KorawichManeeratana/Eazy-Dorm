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

router.post('/gogoqr', upload.single('slip'), async (req, res) => {
    let formdata ={
        slip: req.file ? req.file.filename : null
    };
    let sql = `INSERT INTO Paymenthistory(room_id, pay_date, pay_img)
               VALUE (20, 11/11/1111, '${formdata.slip}');`;
    try {
        await conn.query(sql);
        conn.releaseConnection();
        res.send(`<script>alert("เพิ่มข้อมูลสำเร็จ"); window.location.href = '/qrbill/1';</script>`);
    } catch (err) {
        console.log(err);
    }
});
//Routes
router.get('/:qrpid', (req, res) => {
    res.render('qrbill');
})

module.exports = router;