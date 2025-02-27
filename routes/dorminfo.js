const express = require('express')
const router = express.Router()
const conn = require('../dbconn');

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `SELECT dorm_id, name, detail, address, room, rent, rating, phone_contact, electric_pay, water_pay, dorm_pic FROM Dormitory WHERE dorm_id = ${id};`
    try {
        const rows = await conn.query(sql);
        console.log(rows)
        res.render('dorminfo', { data: rows });
    } catch (error) {
        console.error("Database Error:", error);
    }
});
