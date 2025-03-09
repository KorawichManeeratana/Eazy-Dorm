require("dotenv").config();
const db = require("../../dbconn");

async function getAmen(id) {
  try {
    query =`SELECT DISTINCT a.amen_id, a.name FROM Amenroom ar JOIN Amenities a ON (ar.amen_id = a.amen_id) JOIN Room r ON (ar.room_id = r.room_id ) WHERE r.dorm_id = ? ORDER BY a.name desc;`
    const result = (await db.query(query, [id]))[0];
    db.releaseConnection();
    return {
      status: 200,
      message: "Amenities queryed",
      allAmens: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getAmen;