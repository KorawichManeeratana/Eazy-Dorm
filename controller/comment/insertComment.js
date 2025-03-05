require("dotenv").config();
const db = require("../../dbconn");

async function insertComment(dorm_id, user_id, comment, rating) {
  try {
    query = `INSERT INTO Comment (user_id, dorm_id, comment, rating) VALUES (?, ?, ?, ?)`;
    const result = (await db.query(query, [user_id, dorm_id, comment, rating]))[0];
    db.releaseConnection();
    return {
      status: 200,
      message: "Inserted comment",
      comment: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = insertComment;