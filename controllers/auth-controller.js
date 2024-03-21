// const getCurrent = async (req, res, next) => {
//   //   const { token } = req.user.token;
//   const user = await User.findOne(token);
//   res.status(200).json({
//     email: user.email,
//     subscription: user.subscription,
//   });
// };
import { connection } from '../server.js';
const getAllUsers = async (req, res, next) => {
  try {
    const [rows, fields] = await connection.query('SELECT * FROM users');

    res.json(rows);
    console.log('10', 10);
  } catch (error) {
    console.error('Помилка при отриманні даних з бази даних:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default { getAllUsers };
