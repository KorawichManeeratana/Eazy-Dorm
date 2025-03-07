require("dotenv").config();
const { query } = require("express");
const db = require("../../dbconn");

async function getRoom(id, rent, floors, amens) {
  try {
    let params = [];
    let query =`SELECT room_id, room_number, rent, room_img, size, floor FROM Room`
    if (amens.length) {
      let aplaceholders = amens.map(() => "?").join(", ");
      query = `SELECT r.room_id, r.room_number, r.rent, r.room_img, r.size, r.floor FROM Room r JOIN Amenroom a ON r.room_id = a.room_id WHERE a.amen_id IN (${aplaceholders})`;
      params.push(...amens.map(Number));
    } else {
      query += ' WHERE'
    }
    if (!rent) {
      if (amens.length) {query += ' AND'; query += ` r.loger_id is null`;}
      else {query += ` loger_id is null`;}
    }
    if (floors.length) {
      let placeholders = floors.map(() => "?").join(", ");
      if (amens.length) {query += ` AND r.floor IN (${placeholders})`;}
      else {query += ` AND floor IN (${placeholders})`;}
      params.push(...floors);
    }
    params.push(id);
    if (amens.length) {query += ' AND r.dorm_id = ? GROUP BY r.room_id HAVING COUNT(DISTINCT a.amen_id) = ?;'; params.push(amens.length)}
    else {query += ' AND dorm_id = ?;';}
    console.log(query)
    const result = (await db.query(query, params));
    db.releaseConnection();
    return {
      status: 200,
      message: "Room queryed",
      allRoom: result[0],
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getRoom;