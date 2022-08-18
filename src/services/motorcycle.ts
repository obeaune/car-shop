import { IService } from '../interfaces/IService';
import { MotorcycleZodSchema, IMotorcycle } from '../interfaces/IMotorcycle';
import { IModel } from '../interfaces/IModel';
import { ErrorTypes } from '../errors/errorCatalog';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle:IModel<IMotorcycle>;

  constructor(model:IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj:IMotorcycle):Promise<IMotorcycle> {
    const parsed = MotorcycleZodSchema.safeParse(obj);
    if (!parsed.success) throw parsed.error;
    return this._motorcycle.create(obj);
  }

  public async read():Promise<IMotorcycle[]> {
    const allMotorcycles = await this._motorcycle.read();
    return allMotorcycles;
  }

  public async readOne(_id: string):Promise<IMotorcycle> {
    const motorcycle = await this._motorcycle.readOne(_id);
    if (!motorcycle) throw new Error(ErrorTypes.EntityNotFound);
    return motorcycle;
  }

  public async update(_id: string, body:IMotorcycle):
  Promise<IMotorcycle | null> {
    const parsed = MotorcycleZodSchema.safeParse(body);
    if (!parsed.success) throw parsed.error;
    await this.readOne(_id);
    const updatedMotorcycle = await this._motorcycle.update(_id, body);
    return updatedMotorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    await this.readOne(_id);
    return this._motorcycle.delete(_id);
  }
}

export default MotorcycleService;
