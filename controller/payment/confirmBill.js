require("dotenv").config();
const db = require("../../dbconn");

async function confirmPayment(payId){
    try {
        const query = `DELETE FROM Paymenthistory WHERE pay_id = ${payId}`;
        await db.query(query);
        db.releaseConnection();
        return {status: 200, message: 'Confirm Payment successfully'};
    } catch (error) {
        console.error('Error during Confirm Payment:', error);
        return {status: 500, message: 'Internal Server Error'};
    }
};

module.exports = confirmPayment;