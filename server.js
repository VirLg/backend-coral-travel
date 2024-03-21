import app from './app.js';
import mysql from 'mysql2/promise';

const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'coralTravel',
  port: 3306,
});

export const connection = await pool.getConnection();
connection.release(); // Release the connection after use

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
