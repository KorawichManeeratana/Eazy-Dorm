require("dotenv").config();
const db = require("../../dbconn");

async function getRoom(id, rent, floors) {
  try {
    let params = [id];
    query =`SELECT room_id, room_number, rent, room_img, size, floor FROM Room WHERE dorm_id = ?`
    if (!rent) {
      query += ` AND loger_id is null`;
    }
    if (floors.length) {
      let placeholders = floors.map(() => "?").join(", ");
      query += ` AND floor IN (${placeholders})`;
      params.push(...floors);
    }
    const result = (await db.query(query, params))[0];
    db.releaseConnection();
    return {
      status: 200,
      message: "Room queryed",
      allRoom: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getRoom;