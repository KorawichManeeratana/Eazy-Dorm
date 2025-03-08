require("dotenv").config();
const db = require("../../dbconn");

async function rentRoom(room_id, user_id) {
  console.log(room_id);
  try {
    let check1 = `SELECT loger_id FROM Room where room_id = ?`;
    const result1 = (await db.query(check1, [room_id]))[0][0];
    db.releaseConnection();
    if (result1.loger_id != null){
      return {
        status: 200,
        message: "Room already rented",
      };
    }
    let check2 = `SELECT room_id FROM Room where loger_id = ?`;
    const result2 = (await db.query(check2, [user_id]))[0];
    db.releaseConnection();
    console.log(result2);
    if (result2.length){
      return {
        status: 200,
        message: "You already rent a room",
      };
    }
    let query = `UPDATE Room SET loger_id = ? WHERE room_id = ?`;
    let result = (await db.query(query, [user_id, room_id]))[0];
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