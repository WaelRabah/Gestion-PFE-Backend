export interface IBaseService<T> {
  getAll(): Promise<T[]>;
  get(id: string): Promise<T>;
  update(id: string, model: any): Promise<T>;
  delete(id: string);
}
