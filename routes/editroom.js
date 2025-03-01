const express = require('express')
const router = express.Router()
const conn = require('../dbconn');

router.get('/:rid', async (req, res) => {
    const roomid = req.params.rid;
    let sql = `SELECT * FROM Room WHERE room_id = ${roomid};`;
    try {
        const [rows] = await conn.query(sql, [roomid]);
        console.log(rows[0]);
        res.render('editroom', { data: rows[0] });
    } catch (err) {
        console.log(err);
    }

});
router.post('/process_editroom/:id', async (req, res) => {
    // สมมติว่า :id ใน URL คือ room_id ของห้องที่ต้องการอัปเดต
    let roomId = req.params.id;
    // รับค่า dorm_id สำหรับการ redirect (อาจจะส่งมาจาก form เป็น hidden field)
    let formdata = {
        room_number: req.body.room_number,
        floor: req.body.floor,
        size: req.body.size,
        rent: req.body.rent
    };

    // อัปเดตข้อมูลในตาราง Room
    let sql = `UPDATE Room 
               SET room_number = '${formdata.room_number}', 
                   floor = ${formdata.floor}, 
                   size = ${formdata.size}, 
                   rent = ${formdata.rent}
               WHERE room_id = ${roomId};`;
    let sqldorm = `SELECT dorm_id FROM Room WHERE room_id = ${roomId};`;
    try {
        dorm = await conn.query(sqldorm);
        console.log("here is :", dorm[0][0].dorm_id);
        // ลบข้อมูล Amenities เก่าของห้องนั้น
        let sqlDel = `DELETE FROM Amenroom WHERE room_id = ${roomId};`;
        await conn.query(sqlDel);

        // รับค่า amenity ที่ถูกติ๊กจาก checkbox (ค่าที่ได้จะเป็น array ของ amen_id)
        let facilities = req.body.facilities;
        if (facilities && !Array.isArray(facilities)) {
            facilities = [facilities]; // ถ้าไม่ใช่ array ให้นำมาแปลงเป็น array
        }

        if (facilities && facilities.length > 0) {
            let values = facilities.map(amen_id => `(${roomId}, ${amen_id})`).join(",");
            let sql2 = `INSERT INTO Amenroom (room_id, amen_id) VALUES ${values};`;
            await conn.query(sql2);
        }

        await conn.query(sql);

        res.send(`<script>alert("บันทึกข้อมูลสำเร็จ"); window.location.href = '/owndorminfo/${dorm[0][0].dorm_id}';</script>`);
    } catch (err) {
        console.log(err);
        res.status(500).send("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
    }
});



module.exports = router;