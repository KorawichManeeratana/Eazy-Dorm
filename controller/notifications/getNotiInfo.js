require("dotenv").config();
const db = require("../../dbconn");

async function CookiesDecode(id, limit) {
  try {
    if (!id) {
      return { status: 400, message: "Token is required" };
    }
    let query = ``;

    if (limit) {
      query = `
SELECT DISTINCT
    n.*,
    u.*,
    (SELECT COUNT(*) FROM notifications WHERE toWho = ${id} AND status = 'unread') AS unread_count
FROM
    notifications n
LEFT JOIN
    Users u ON n.fromWho = u.user_id
WHERE
    n.toWho = ${id}
ORDER BY
    n.createAt DESC
LIMIT 5;`
    } else {
      query = `
SELECT
    n.*,
    u.*
FROM
    notifications n
LEFT JOIN
    Users u ON n.fromWho = u.user_id
WHERE
    n.toWho = ${id}`;
    }
    
    const [result, fill] = await (await db.getConnection()).query(query);
    db.releaseConnection();
    return {
      status: 200,
      message: "Token verified and decoded",
      allNoti: [result, fill],
    };
  } catch (error) {
    console.error("Get Notification Error:", error);

    if (error.name === "JsonWebTokenError") {
      return {
        status: 401,
        message: "Invalid token signature",
        error: error.message,
      };
    } else if (error.name === "TokenExpiredError") {
      return {
        status: 401,
        message: "Token has expired",
        error: error.message,
      };
    } else {
      return {
        status: 500,
        message: "Token verification error",
        error: error.message,
      };
    }
  }
}

module.exports = CookiesDecode;
