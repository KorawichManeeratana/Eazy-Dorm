require('dotenv').config({ path: './db.env' });
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  connectTimeout: 100000

});

connection.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to database.');
  connection.query('SELECT * FROM Users LIMIT 5', (err, results) => {
    if (err) {
      console.error('Query error:', err);
    } else {
      console.log('Query results:', results);
    }
    connection.end();
  });
});

module.exports = connection;
