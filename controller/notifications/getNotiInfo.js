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
      query = `WITH FirstPayment AS (
    SELECT
        room_id,
        MIN(pay_id) AS first_pay_id
    FROM
        Paymenthistory
    GROUP BY
        room_id
)
SELECT DISTINCT
    n.*,
    u.*,
    (SELECT COUNT(*) FROM notifications WHERE toWho = ${id} AND status = 'unread') AS unread_count,
    fp.first_pay_id AS pay_id
FROM
    notifications n
LEFT JOIN
    Users u ON n.fromWho = u.user_id
LEFT JOIN
    Room r ON n.toWho = r.loger_id
LEFT JOIN
    FirstPayment fp ON r.room_id = fp.room_id
WHERE
    n.toWho = ${id}
ORDER BY
    n.createAt ASC
LIMIT 5;`
    } else {
      query = `WITH FirstPayment AS (
    SELECT
        room_id,
        MIN(pay_id) AS first_pay_id
    FROM
        Paymenthistory
    GROUP BY
        room_id
)
SELECT
    n.*,
    u.*,
    fp.first_pay_id AS pay_id
FROM
    notifications n
LEFT JOIN
    Users u ON n.fromWho = u.user_id
LEFT JOIN
    Room r ON n.toWho = r.loger_id
LEFT JOIN
    FirstPayment fp ON r.room_id = fp.room_id
WHERE
    n.toWho = ${id};`;
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
