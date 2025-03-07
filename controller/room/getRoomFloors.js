require("dotenv").config();
const db = require("../../dbconn");

async function getRoomFloors(id) {
  try {
    query =`SELECT DISTINCT floor FROM Room WHERE dorm_id = ? AND loger_id is null ORDER BY floor desc;`
    const result = (await db.query(query, id))[0];
    db.releaseConnection();
    return {
      status: 200,
      message: "Floor queryed",
      allFloors: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getRoomFloors;