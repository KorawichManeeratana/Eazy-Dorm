require("dotenv").config();
const db = require("../../dbconn");

async function getDorm(text) {
  try {
    text = `%${text}%`
    query = `SELECT dorm_id, name, rent, dorm_pic, address FROM Dormitory WHERE name LIKE ? UNION SELECT dorm_id, name, rent, dorm_pic, address FROM Dormitory WHERE address LIKE ?;`;
    const result = (await db.query(query, [text, text]))[0];
    return {
      status: 200,
      message: "Dorm queryed",
      allDorm: result,
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getDorm;