require('dotenv').config();
const bcrypt = require('bcrypt');
const db = require('../../dbconn');
const jwt = require('jsonwebtoken');

async function loginUser(loginData) {
    console.log("Login Data: ", loginData);
    const eoru = loginData.uore;
    const password = loginData.password;

    let query = ``;

    if (eoru.indexOf('@') == -1) {
         query = `SELECT * FROM Users WHERE username = '${eoru}'`;
    } else {
        query = `SELECT * FROM Users WHERE email = '${eoru}'`;
    }

    try {
        const connection = await db.getConnection();
        const [result] = await connection.query(query);
        if (result.length > 0) {
            const user = result[0];
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                
                const token = jwt.sign(
                    { username: user.username, email: user.email , role: user.role },
                    process.env.ACCESSKEYID,
                    { expiresIn: '1d' }
                );

                return ({ status: 200, message: 'Login successful', token: token });
            } else {
                return ({ status: 401, message: 'รหัสผ่านไม่ถูกต้อง' });
            }
        } else {
            return ({ status: 404, message: 'User not found' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        return ({ status: 500, message: 'Database error', error: error.message});
    }
};

module.exports = loginUser;