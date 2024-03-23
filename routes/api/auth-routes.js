import { Router } from 'express';
import { ctrlWrapper, validateBody } from '../../helpers/index.js';
import controllerUser from '../../controllers/auth-controller.js';
import { userJoiSignup, userJoiSignin } from '../../model/users.js';
import isBodyEmpty from '../../middlewares/isBodyEmpty.js';
const authRouter = Router();

const {
  getAllUsers,
  signup,
  signin,
  verificationElasticEmail,
  resendEmailVerify,
} = controllerUser;

const joiValidateAuth = validateBody(userJoiSignup);
const joiValidateSignin = validateBody(userJoiSignin);

authRouter.get('/', ctrlWrapper(getAllUsers));
authRouter.post('/register', isBodyEmpty, joiValidateAuth, ctrlWrapper(signup));
authRouter.post('/login', isBodyEmpty, joiValidateSignin, ctrlWrapper(signin));
authRouter.get('/verify/:verificationToken', verificationElasticEmail);
authRouter.post('/verify', resendEmailVerify);
export default authRouter;
