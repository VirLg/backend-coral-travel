import express from 'express';
import cors from 'cors';
import authRouter from './routes/api/auth-routes.js';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/api/users', authRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found!!!!!!!' });
});

app.use((err, req, res, next) => {
  const { status = 500, message = 'Error Server' } = err;
  res.status(status).json({ message });
});

export default app;
