import { Router } from 'express';
import 'express-async-errors';
import MotorcycleController from '../controllers/motorcycle';
import MotorcycleModel from '../models/Motorcycle';
import MotorcycleService from '../services/motorcycle';

const route = Router();

const motorcycle = new MotorcycleModel();
const motorcycleService = new MotorcycleService(motorcycle);
const motorcycleController = new MotorcycleController(motorcycleService);

route.post('/', (req, res) => motorcycleController.create(req, res));
route.get('/', (req, res) => motorcycleController.read(req, res));
route.get('/:id', (req, res) => motorcycleController.readOne(req, res));
route.put('/:id', (req, res) => motorcycleController.update(req, res));
route.delete('/:id', (req, res) => motorcycleController.delete(req, res));

export default route;
