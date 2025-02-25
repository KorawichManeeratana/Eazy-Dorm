require('dotenv').config();
const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.ACCESSKEYID;

async function CookiesDecode(token) {
    console.log("Token received:", token);

    try {
        if (!token) {
            return { status: 400, message: 'Token is required' };
        }

        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("Decoded token:", decoded);
        return { status: 200, message: 'Token verified and decoded', decoded: decoded };

    } catch (error) {
        console.error("Verification Error:", error);


        if (error.name === 'JsonWebTokenError') {
            return { status: 401, message: 'Invalid token signature', error: error.message };
        } else if (error.name === 'TokenExpiredError') {
            return { status: 401, message: 'Token has expired', error: error.message };
        } else {
            return { status: 500, message: 'Token verification error', error: error.message };
        }
    }
};

module.exports = CookiesDecode;