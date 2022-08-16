import express from 'express';
import 'express-async-errors';
import errorHandler from './middlewares/error';
import CarRouter from './routes/carRouter';

const app = express();

app.use(express.json());
app.use(CarRouter);
app.use(errorHandler);

export default app;
