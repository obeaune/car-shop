export interface IService<T> {
  create(obj:T):Promise<T>,
  read(): Promise<T[]>,
  readOne(arg0: string): Promise<T>,
  update(arg0: string, obj: T): Promise<T | null>,
  delete(arg0: string): Promise<T | null>,
}
