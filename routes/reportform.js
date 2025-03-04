const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

//Routes
router.get('/:rid', (req, res) => {
    let roomid = req.params.rid;
    res.render('reportform', {roomid});
})

router.post('/sendproblem/:rid', async (req, res) => {    
    let roomid = req.params.rid;
    let formdata = {
        title: req.body.title,
        content: req.body.content
    }
    let word = formdata.title+" : "+formdata.content;
    let sql = `INSERT INTO Report(room_id, detail) VALUE ( ?, ?);`;
    try {
        const [rows] = await conn.query(sql, [roomid, word]);
        console.log(rows);
        res.redirect('/reportform/'+roomid);
    } catch (err) {
        console.log(err)
    }
});

module.exports = router;