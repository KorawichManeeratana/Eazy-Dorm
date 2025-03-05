require("dotenv").config();
const db = require("../../dbconn");

async function getRoom(id, rent) {
  try {
    if (!rent) {
      query = `SELECT room_id, room_number, rent, room_img, size, floor FROM Room WHERE dorm_id = ? and loger_id is null;`;
    } else {
      query = `SELECT room_id, room_number, rent, room_img, size, floor FROM Room WHERE dorm_id = ?`;
    }
    const result = (await db.query(query, id))[0];
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