import { Request, Response } from 'express';
import { IService } from '../interfaces/IService';
import { IMotorcycle } from '../interfaces/IMotorcycle';

export default class CarController {
  constructor(private _service: IService<IMotorcycle>) { }

  public async create(
    req: Request & { body: IMotorcycle },
    res: Response<IMotorcycle>,
  ) {
    const { model, year, color, status,
      buyValue, category, engineCapacity } = req.body;
    const motorcycle = {
      model, year, color, status, buyValue, category, engineCapacity, 
    };
    const createdMotorcycle = await this._service.create(motorcycle);
    return res.status(201).json(createdMotorcycle);
  }

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const allMotorcycles = await this._service.read();
    return res.status(200).json(allMotorcycles);
  }

  public async readOne(req: Request, res: Response<IMotorcycle>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response) {
    await this._service.delete(req.params.id);
    return res.status(204).json();
  }
}
