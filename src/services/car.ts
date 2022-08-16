import { IService } from '../interfaces/IService';
import { CarZodSchema, ICar } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/errorCatalog';

class CarService implements IService<ICar> {
  private _car:IModel<ICar>;

  constructor(model:IModel<ICar>) {
    this._car = model;
  }

  public async create(obj:ICar):Promise<ICar> {
    const parsed = CarZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._car.create(obj);
  }

  public async read():Promise<ICar[]> {
    const allCars = await this._car.read();
    return allCars;
  }

  public async readOne(_id: string):Promise<ICar> {
    const car = await this._car.readOne(_id);
    if (!car) throw new Error(ErrorTypes.EntityNotFound);
    return car;
  }

  public async update(_id: string, body:ICar):Promise<ICar | null> {
    const parsed = CarZodSchema.safeParse(body);
    if (!parsed.success) throw parsed.error;
    await this.readOne(_id);
    const updatedCar = await this._car.update(_id, body);
    return updatedCar;
  }

  public async delete(_id: string): Promise<ICar | null> {
    await this.readOne(_id);
    return this._car.delete(_id);
  }
}

export default CarService;
