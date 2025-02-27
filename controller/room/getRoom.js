require("dotenv").config();
const db = require("../../dbconn");

async function getRoom(id) {
  try {
    query = `SELECT room_id, room_number, rent, room_img, size FROM Room WHERE dorm_id = "%?%";`;
    const [result, fill] = await (await db.getConnection()).query(query, [parseInt(id)]);
    return {
      status: 200,
      message: "Room queryed",
      allRoom: [result, fill],
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getRoom;