export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  update(id: string, model: T): Promise<T>;
  create(model: T): Promise<T>;
  delete(id: string);
}
