const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

//Routes
router.get('/:id/:uid', (req, res) => {
    let dormid = req.params.id;
    let userid = req.params.uid;
    res.render('addroom',{dormid, userid});
})


router.post('/process_addroom/:id/:uid', async (req, res) =>{
    let dormid = req.params.id;
    let userid = req.params.uid;
    let formdata ={
        room_number: req.body.room_number,
        floor: req.body.floor,
        size: req.body.size,
        rent: req.body.rent
    };
    let sql = `INSERT INTO Room (dorm_id, room_number, floor, size, rent) 
               VALUES (${dormid}, '${formdata.room_number}', ${formdata.floor}, ${formdata.size}, ${formdata.rent});`
    try {
        await conn.query(sql);
        res.send(`<script>alert("บันทึกข้อมูลสำเร็จ"); window.location.href = '/owndorminfo/${dormid}/${userid}';</script>`);
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
