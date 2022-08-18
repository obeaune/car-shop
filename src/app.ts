import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import indexRouter from './routes';

const app = express();

app.use(express.json());
app.use(indexRouter);
app.use(errorHandler);

export default app;
