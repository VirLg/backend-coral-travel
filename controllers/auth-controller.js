import User from '../model/users.js';
import { httpError, ctrlWrapper } from '../helpers/index.js';
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
  const { name, email, phone, password } = req.body;

  try {
    const query =
      'INSERT INTO users (name, email,password,phone) VALUES (?, ?,?,?)';
    const values = [name, email, phone, password];

    const [result] = await connection.execute(query, values);

    res.json(result);
  } catch (error) {
    console.error('Error adding user:', error);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;
  const User = getAllUsers();
  const user = await User.findOne({ email });
  if (!user) {
    throw httpError(401, 'Email or password is wrong');
  } else if (!user.verify) {
    throw httpError(401, 'Email not verifycate');
  } else {
    const passCompare = await bcrypt.compare(password, user.password);
    if (!passCompare) {
      throw httpError(401, 'Email or password is wrong');
    } else {
      const token = generateToken(user._id);
      await User.findByIdAndUpdate(user._id, { token });
      res.status(200).json({
        token,
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      });
    }
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
