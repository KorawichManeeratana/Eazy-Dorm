const express = require('express');
const router = express.Router();
const conn = require('../dbconn');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const sql1 = `SELECT room_id, room_number, size, rent, floor, room_img, loger_id FROM Room WHERE room_id = ?;`
    const sql2 = `SELECT a.name FROM Amenities a JOIN Amenroom r ON (a.amen_id = r.amen_id) WHERE r.room_id = ?;`
    try {
        const room = await conn.query(sql1, id);
        const amenities = await conn.query(sql2, id);
        conn.releaseConnection();
        res.render('roominfo', { room: room[0][0], amenities: amenities[0] });
    } catch (error) {
        console.error("Database Error:", error);
    }
});

module.exports = router;