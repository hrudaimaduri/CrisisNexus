import { UniqueEntityID } from "../base/UniqueEntityID";

export interface IRepository<T> {
  findById(id: UniqueEntityID): Promise<T | null>;

  exists(id: UniqueEntityID): Promise<boolean>;

  save(entity: T): Promise<void>;

  delete(id: UniqueEntityID): Promise<void>;
}