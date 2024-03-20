// import express from 'express';
// import cors from 'cors';
// import mySql2 from 'mysql2/promise';
// import authRouter from './routes/api/auth-routes';

// const app = express();
// app.use(cors());
// // app.use(express.json());
// export default app;
// app.use('/users', authRouter);

// import contactsRouter from './routes/api/contacts.js';
// import authRouter from './routes/api/auth-router.js';
// import express from 'express';
// import logger from 'morgan';
// import cors from 'cors';
// import dotenv from 'dotenv';

// const app = express();
// dotenv.config();
// const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

// app.use(logger(formatsLogger));
// app.use(cors());
// app.use(express.json());

// app.use('/api/users', authRouter);
// app.use('/api/contacts', contactsRouter);

// app.use((req, res) => {
//   res.status(404).json({ message: 'Not found!!!!!!!' });
// });

// app.use((err, req, res, next) => {
//   const { status = 500, message = 'Error Server' } = err;
//   res.status(status).json({ message });
// });

// export default app;
