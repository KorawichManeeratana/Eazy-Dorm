require("dotenv").config();
const { query } = require("express");
const db = require("../../dbconn");

async function getRoom(id, rent, floors, amens, min, max) {
  try {
    let params = [];
    let conditions = [];
    let joins = [];
    let groupBy = "";
    let having = "";

    let query = `SELECT r.room_id, r.room_number, r.rent, r.room_img, r.size, r.floor, r.loger_id FROM Room r`;

    if (amens.length) {
      let aplaceholders = amens.map(() => "?").join(", ");
      joins.push(`JOIN Amenroom a ON r.room_id = a.room_id`);
      conditions.push(`a.amen_id IN (${aplaceholders})`);
      groupBy = `GROUP BY r.room_id`;
      having = `HAVING COUNT(DISTINCT a.amen_id) = ?`;
      params.push(...amens.map(Number));
    }

    if (!rent) {
      conditions.push(`r.loger_id IS NULL`);
    }

    if (floors.length) {
      let floorPlaceholders = floors.map(() => "?").join(", ");
      conditions.push(`r.floor IN (${floorPlaceholders})`);
      params.push(...floors);
    }

    conditions.push(`r.rent BETWEEN ? AND ?`);
    params.push(min, max);

    conditions.push(`r.dorm_id = ?`);
    params.push(id);
    if (amens.length) {params.push(amens.length);}

    if (joins.length) query += ` ${joins.join(" ")}`;
    if (conditions.length) query += ` WHERE ${conditions.join(" AND ")}`;
    if (groupBy) query += ` ${groupBy}`;
    if (having) query += ` ${having}`;

    query += " ORDER BY room_number desc;";

    const result = await db.query(query, params);
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