require("dotenv").config();
const db = require("../../dbconn");

async function getDorm(text) {
  try {
    if (text){
        query = `SELECT dorm_id, name, rent, dorm_pic FROM Dormitory WHERE name = "%${text}%";`;
    }else{
        query = `SELECT dorm_id, name, rent, dorm_pic FROM Dormitory;`;
    }
    const [result, fill] = await (await db.getConnection()).query(query);
    return {
      status: 200,
      message: "Dorm queryed",
      allDorm: [result, fill],
    };
  } catch (error) {
    console.error(error);
  }
}

module.exports = getDorm;