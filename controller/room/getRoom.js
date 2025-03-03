require("dotenv").config();
const db = require("../../dbconn");

async function getRoom(id) {
  try {
    query = `SELECT room_id, room_number, rent, room_img, size, floor FROM Room WHERE dorm_id = ?;`;
    const result = (await db.query(query, id))[0];
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