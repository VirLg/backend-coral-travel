import { Router } from 'express';
import controllerUser from '../../controllers/auth-controller.js';
const authRouter = Router();

const {
  getAllUsers,
  add,
  signin,
  verificationElasticEmail,
  resendEmailVerify,
} = controllerUser;

authRouter.get('/', getAllUsers);
authRouter.post('/', add);
authRouter.post('/login', signin);
authRouter.get('/verify/:verificationToken', verificationElasticEmail);
authRouter.post('/verify', resendEmailVerify);
export default authRouter;
