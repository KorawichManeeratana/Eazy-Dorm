const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

router.get('/:id/:uid', async (req, res) => {
    const dormid = req.params.id;
    const userid = req.params.uid;
    console.log("This is :", dormid);
    console.log("This is :", userid);

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
        res.render('owndorminfo', { data: rooms, dormid, roomAmenities, userName, userid});
    } catch (error) {
        console.error("Database Error:", error);
        res.status(500).send("เกิดข้อผิดพลาดในการดึงข้อมูล");
    }
});


router.post('/process_delroom/:id/:did/:uid', async (req, res) =>{
    const roomid = req.params.id;
    const dormid = req.params.did;
    const userid = req.params.uid;
    const sql = `DELETE FROM Room WHERE room_id = ${roomid};`
    const sql2 = `DELETE FROM Amenroom WHERE room_id = ${roomid};`
    try {
        await conn.query(sql2);
        await conn.query(sql, [dormid]);
        res.send(`<script>alert("ลบข้อมูลห้องพักสำเร็จ"); window.location.href = '/owndorminfo/${dormid}/${userid}';</script>`);
    } catch (error) {
        console.error("Database Error:", error);
    }
});



router.post('/process_deldorm/:id/:uid', async (req, res) => {
    console.log("POST /process_del/:id ถูกเรียกใช้"); 
    const dormId = req.params.id;
    const userid = req.params.uid;
    console.log("กำลังลบหอพัก ID:", dormId);
    console.log("กำลังลบหอพัก ID:", userid);

    const sql = `DELETE FROM Dormitory WHERE dorm_id = ${dormId};`;
    const sql2 =  `SELECT COUNT(room_id) as croom FROM Room WHERE dorm_id = ${dormId};`;
    try {
        let countroom = await conn.query(sql2);
        if(countroom[0][0].croom!=0){
            res.send(`<script>alert("จำเป็นต้องลบห้องพักก่อนจึงจะลบหอพักได้"); window.location.href = '/owndorminfo/${dormId}/${userid}';</script>`);
        }else{
            const [result] = await conn.query(sql, [dormId]); 
            console.log("ลบสำเร็จ");
            res.send(`<script>alert("ลบข้อมูลหอพักสำเร็จ"); window.location.href = '/owneddorm/${userid}';</script>`);
        }  
    } catch (err) {
        console.error("เกิดข้อผิดพลาด:", err);
    }
});

module.exports = router;