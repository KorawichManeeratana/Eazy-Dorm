require("dotenv").config();
const db = require("../../dbconn");

async function addNewPayment(roomid, dormname, totalrent, waterBill, elecBill){
    try {
        const query = `INSERT INTO notifications (toWho, fromWho, content)
SELECT
    r.loger_id,
    d.owner_id,
    CONCAT('จ่ายเงินค่าเช่าหอพัก ', '${dormname}', ' โดยเป็นเงินรวมทั้งสิ้น ', ${totalrent}, ' บาท') AS content
FROM Room r
JOIN Dormitory d ON r.dorm_id = d.dorm_id
WHERE r.room_id = ${roomid};`;
        const sqltohistory = `INSERT INTO Paymenthistory (room_id, totalamount, waterBill, electricBill) VALUES (${roomid}, ${totalrent}, ${waterBill}, ${elecBill})`;
        await db.query(query);
        await db.query(sqltohistory);
        db.releaseConnection();
        return {status: 200, message: 'ADD NEW Payment successfully'};
    } catch (error) {
        console.error('Error during add new Payment:', error);
        return {status: 500, message: 'Internal Server Error'};
    }
};

module.exports = addNewPayment;