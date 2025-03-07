require("dotenv").config();
const db = require("../../dbconn");

async function getAmen() {
  try {
    query =`SELECT DISTINCT a.amen_id, a.name FROM Amenroom r JOIN Amenities a ON (r.amen_id = a.amen_id) ORDER BY a.name desc;`
    const result = (await db.query(query))[0];
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