export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  update(model: T): Promise<T>;
  create(model: T): Promise<string>;
  delete(id: string);
}
