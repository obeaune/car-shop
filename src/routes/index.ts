import { Router } from 'express';
import CarRouter from './carRouter';
import MotorcycleRouter from './motorcycleRouter';

const indexRouter = Router();

indexRouter.use('/cars', CarRouter);

indexRouter.use('/motorcycles', MotorcycleRouter);

export default indexRouter;