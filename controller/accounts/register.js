const bcrypt = require('bcrypt');
const db = require('../../dbconn');

async function registerAccount(userData) {
    const username = userData.username;
    const password = userData.password;
    const firstname = userData.firstName;
    const lastname = userData.lastName;
    const dob = userData.dob;
    const email = userData.email;
    const role = userData.role;
    const phone = userData.tel;

    console.log("Info: ", username, password, firstname, lastname, dob, email, role, phone);

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userpic = 'https://th.bing.com/th/id/OIP.Od4m4w455EEToOQDKESqvgHaFJ?rs=1&pid=ImgDetMain';

        const [result, fill] = await (await db.getConnection()).query(
            `INSERT INTO Users (username, password, first_name, last_name, dob, phone, email, user_pic, role) VALUES ('${username}', '${hashedPassword}', '${firstname}', '${lastname}', '${dob}', '${phone}', '${email}', '${userpic}', '${role}')`
        );

        if (result && result.affectedRows > 0) {
            db.releaseConnection();
            return { status: 201, message: 'Account registered successfully' };
        } else {
            db.releaseConnection();
            return { status: 500, message: 'Failed to register account' };
        }
        
    } catch (error) {
        console.log("Error: ", error);
        let message = 'error during registration';
        return { status: 500, message: message };
    }
}

module.exports = registerAccount;