require("dotenv").config();
const db = require("../../dbconn");

async function updateNotification(notiId){
    try {
        const id  = notiId;
        const query = `UPDATE notifications SET status = "read" WHERE NotiID = ${id}`;

        await db.query(query);
        db.releaseConnection();
        return {status: 200, message: 'Notification updated successfully'};
    } catch (error) {
        console.error('Error updating notification:', error);
        return {status: 500, message: 'Internal Server Error'};
    }
};

module.exports = updateNotification;