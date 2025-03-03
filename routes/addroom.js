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
               VALUES (?, ?, ?, ?, ?);`
    try {
        await conn.query(sql, [dormid, formdata.room_number, formdata.floor, formdata.size, formdata.rent]);
        res.redirect('/owndorminfo/'+dormid+'/'+userid);
        conn.releaseConnection();
    } catch (err) {
        console.log(err);
    }
})

module.exports = router;
