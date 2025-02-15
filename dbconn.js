require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  multipleStatements: true,
  connectionLimit: 10,
  enableKeepAlive: true,
  connectTimeout: 10000
});


connection.getConnection((err, connectionInstance) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to database.');
  connectionInstance.query('SELECT * FROM Users LIMIT 5', (err, results) => {
    if (err) {
      console.error('Query error:', err);
    } else {
      console.log('Query results:', results);
    }
    connectionInstance.release();
  });
});

module.exports = connection;
