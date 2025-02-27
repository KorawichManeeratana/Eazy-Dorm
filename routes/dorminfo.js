const express = require('express')
const router = express.Router()
const conn = require('../dbconn');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const sql1 = `SELECT dorm_id, name, detail, address, room, rent, rating, phone_contact, electric_pay, water_pay, dorm_pic FROM Dormitory WHERE dorm_id = ?;`
    const sql2 = `SELECT c.comment, c.rating, u.username, u.user_pic FROM Comment c JOIN Users u ON (c.user_id = u.user_id) WHERE c.dorm_id = ?;`
    try {
        const dorm = await conn.query(sql1, [id]);
        const comment = await conn.query(sql2, [id]);
        res.render('dorminfo', { dorm, comment });
    } catch (error) {
        console.error("Database Error:", error);
    }
});

module.exports = router;