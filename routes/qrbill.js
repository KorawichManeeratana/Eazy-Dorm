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

router.post('/gogoqr/:qrpid', upload.single('slip'), async (req, res) => {
    let formdata ={
        slip: req.file ? req.file.filename : null
    };
    let sql = `UPDATE Paymenthistory SET pay_img = '${formdata.slip}' WHERE pay_id = ${req.params.qrpid}`;
    try {
        await conn.query(sql);
        conn.releaseConnection();
        res.send(`<script>alert("เพิ่มข้อมูลสำเร็จ"); window.location.href = '/';</script>`);
    } catch (err) {
        console.log(err);
    }
});

//Routes
router.get('/:qrpid', async (req, res) => {
    const payid = req.params.qrpid;
    let sql = `SELECT
    ph.*,
    r.room_number,
    r.rent,
    d.name AS dormitory_name,
    d.payChannel,
    u.first_name,
    u.last_name,
    d.qrcode
FROM
    Paymenthistory ph
JOIN
    Room r ON ph.room_id = r.room_id
JOIN
    Dormitory d ON r.dorm_id = d.dorm_id
JOIN
    Users u ON d.owner_id = u.user_id
WHERE
    ph.pay_id = ${payid};`
    try {
        const [rows] = await conn.query(sql);
        console.log(rows[0]);
        conn.releaseConnection();
        res.render('qrbill', { data: rows[0], payid: payid});
    } catch (err) {
        console.log(err);
    }

})


module.exports = router;