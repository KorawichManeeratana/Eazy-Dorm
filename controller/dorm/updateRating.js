require("dotenv").config();
const db = require("../../dbconn");

async function updateRating(dorm_id) {
  try {
    query = `SELECT COUNT(rating) as howmany, SUM(rating) as sum FROM Comment WHERE dorm_id = ?;`;
    const result1 = (await db.query(query, [dorm_id]))[0][0];
    let rating = result1.sum/result1.howmany;
    query = `UPDATE Dormitory SET rating = ? WHERE dorm_id = ?`;
    const result = (await db.query(query, [rating, dorm_id]))[0];
    db.releaseConnection();
    return {
      status: 200,
      message: "Dorm rating updated",
      DormRating: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = updateRating;