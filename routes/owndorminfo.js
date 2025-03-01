const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

router.get('/:id', async (req, res) => {
    const dormid = req.params.id;
    console.log("This is :", dormid);

    try {
        const sqlRooms = `SELECT * FROM Room WHERE dorm_id = ?;`;
        const [rooms] = await conn.query(sqlRooms, [dormid]);
        let roomAmenities = {};
        let userName = {};
        for (let room of rooms) {
            const sqlAmenities = `SELECT a.name 
                                  FROM Amenities a 
                                  JOIN Amenroom ar ON a.amen_id = ar.amen_id 
                                  WHERE ar.room_id = ?;`;
            const sqluser = `SELECT CONCAT(u.first_name, ' ', u.last_name) as full
                             FROM Users u
                             JOIN Room r ON u.user_id = r.loger_id
                             WHERE r.room_id = ?;`;
            const [amenities] = await conn.query(sqlAmenities, [room.room_id]);
            const [username] = await conn.query(sqluser, [room.room_id]);
            roomAmenities[room.room_id] = amenities.map(a => a.name);
            userName[room.room_id] = username.length > 0 ? username[0].full : "ไม่มีผู้เช่า";
        }
        res.render('owndorminfo', { data: rooms, dormid, roomAmenities, userName});
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
});


router.post('/process_delroom/:id/:did', async (req, res) =>{
    const roomid = req.params.id;
    const dormid = req.params.did;
    const sql = `DELETE FROM Room WHERE room_id = ${roomid};`
    const sql2 = `DELETE FROM Amenroom WHERE room_id = ${roomid};`
    try {
        await conn.query(sql2);
        await conn.query(sql, [dormid]);
        res.send(`<script>alert("ลบข้อมูลห้องพักสำเร็จ"); window.location.href = '/owndorminfo/${dormid}';</script>`);
    } catch (error) {
        console.error("Database Error:", error);
    }
});

module.exports = router;