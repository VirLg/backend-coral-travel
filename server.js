import express from 'express';
import mysql from 'mysql2/promise';

const app = express();
const port = 3000;

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'phone_book',
  port: 3306,
});

const connection = await pool.getConnection();
const a = connection.release(); // Release the connection after use
console.log('a', a);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get('/', async (req, res) => {
  try {
    const [rows, fields] = await connection.query('SELECT * FROM abonents');

    res.json(rows);
  } catch (error) {
    console.error('Помилка при отриманні даних з бази даних:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
