const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

//Routes
let rent = false;
let [rows] = [];
router.get('/:id', async (req, res) => {
    console.log("Received id:", req.params.id);
    const sql = `SELECT Users.user_id, Users.first_name, Users.last_name, Users.Phone, Users.email, Users.dob, Users.username, Users.role, Users.user_pic, Room.room_number, Dormitory.dorm_id, Dormitory.name, Dormitory.phone_contact, Dormitory.address, Dormitory.dorm_pic
    FROM Users INNER JOIN Room ON Users.user_id = Room.loger_id
    INNER JOIN
        Dormitory ON Room.dorm_id = Dormitory.dorm_id
    WHERE
        Users.user_id = ?;`
    
    const newsql = `SELECT user_id, first_name, last_name, Phone, email, dob, username, role, user_pic FROM Users WHERE user_id = ?;`;
    
    try {
        let userid = req.params.id;
        [rows] = await conn.query(sql, [req.params.id]);
        console.log("brforeprof:", rows)
        if  (rows.length == 0 || rows == []){
            rent = false;
            [rows] = await conn.query(newsql, [req.params.id]);
        }else{
            rent = true;
        }
        console.log("prof:", rows)
        res.render('profile', { data: rows[0], id: userid, rent: rent});
    } catch (error) {
        console.error("Error during per user profile info:", error);
        res.status(500).send("An error occurred.");
    }
})

module.exports = router;