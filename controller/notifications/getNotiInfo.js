require("dotenv").config();
const db = require("../../dbconn");

async function CookiesDecode(id, limit) {
  console.log("ToWhoID:", id);

  try {
    if (!id) {
      return { status: 400, message: "Token is required" };
    }
    let query = ``;

    if (limit) {
      query = `SELECT
    n.*,
    u.*,
    (SELECT COUNT(*) FROM notifications WHERE toWho = ${id} AND status = 'unread') AS unread_count,
    ph.pay_id
FROM
    notifications n
LEFT JOIN
    Users u ON n.fromWho = u.user_id
LEFT JOIN  -- Join Room table
    Room r ON n.toWho = r.loger_id
LEFT JOIN  -- Join Paymenthistory table
    Paymenthistory ph ON r.room_id = ph.room_id
WHERE
    n.toWho = ${id}
GROUP BY
    n.NotiID, ph.pay_id
ORDER BY
    n.createAt ASC
LIMIT 5;`;
    } else {
      query = `SELECT n.*, u.* FROM notifications n LEFT JOIN Users u ON n.fromWho = u.user_id WHERE n.toWho = ${id};`;
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
