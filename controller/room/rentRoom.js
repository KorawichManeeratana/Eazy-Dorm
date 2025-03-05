require("dotenv").config();
const db = require("../../dbconn");

async function rentRoom(room_id, user_id) {
  try {
    check = `SELECT loger_id FROM Room where room_id = ?`;
    const result = (await db.query(check, [room_id]))[0][0];
    if (result.loger_id != null){
        return {
            status: 500,
            message: "Room allready rented",
            allRoom: result,
          };
    }
    query = `UPDATE Room SET loger_id = ? WHERE room_id = ?`;
    result = (await db.query(query, [user_id, room_id]))[0];
    db.releaseConnection();
    return {
      status: 200,
      message: "Room rented",
      allRoom: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = rentRoom;