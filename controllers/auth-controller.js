import User from '../model/users.js';
import {
  httpError,
  validateHashPassword,
  generateToken,
} from '../helpers/index.js';
import bcrypt from 'bcrypt';
import { connection } from '../server.js';
const getAllUsers = async (req, res, next) => {
  try {
    const [rows, fields] = await connection.query('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    console.error('Помилка при отриманні даних з бази даних:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const signup = async (req, res, next) => {
  const { name, email, password, phone, token = 'NULL' } = req.body;
  const [rows, fields] = await connection.query('SELECT * FROM users');
  const user = await rows.find(({ email }) => email === req.body.email);
  if (user) {
    throw httpError(409, `${email} in use `);
  } else {
    const query =
      'INSERT INTO users (name, email,password,phone,token) VALUES (?, ?,?,?,?)';
    const hashPassword = await validateHashPassword(password);
    const values = [name, email, hashPassword, phone, token];
    const [result] = await connection.execute(query, values);
    res.status(201).json({
      email: createUser.email,
    });
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const [userDataRows, fields] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    const user = userDataRows[0];
    console.log('userSign', user);
    if (!user) {
      console.log('first', 'first');
      throw httpError(401, 'Email or password is wrong');
    } else {
      const passCompare = await bcrypt.compare(password, user.password);

      if (!passCompare) {
        throw httpError(401, 'Email or password is wrong');
      } else {
        const token = generateToken(user.email);

        await connection.query('UPDATE users SET token = ? WHERE email = ?', [
          token,
          email,
        ]);

        res.status(200).json({
          token,
        });
      }
    }
  } catch (error) {
    next(error);
  }
};

const verificationElasticEmail = async (req, res, next) => {
  // const { verificationToken } = req.params;
  // const user = await User.findOne({ verificationToken });
  // if (!user) {
  //   throw HttpError(404, 'User not foun');
  // } else {
  //   await User.findByIdAndUpdate(user._id, {
  //     verify: true,
  //     verificationToken: null,
  //   });
  //   res.status(200).json({ message: 'Verification successful' });
  // }
};

const resendEmailVerify = async (req, res, next) => {
  // const { email } = req.body;
  // const user = await User.findOne({ email });
  // if (!user) {
  //   throw HttpError(401, 'Email is wrong');
  // }
  // if (user.verify) {
  //   throw HttpError(204, 'Email is verify');
  // } else {
  //   elasticemail({
  //     to: [email, 'rocav44797@soebing.com'],
  //     sendBody: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Hello, this verification link</a>`,
  //   });
  //   res.status(200).json({ message: 'Verification successful' });
  // }
};
export default {
  getAllUsers,
  signup,

  signin,
  resendEmailVerify,
  verificationElasticEmail,
};
