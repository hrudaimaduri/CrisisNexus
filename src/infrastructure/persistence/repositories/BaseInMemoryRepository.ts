import { Entity } from "../../../domain/shared/base/Entity";
import { IRepository } from "../../../domain/shared/repository/IRepository";
import { UniqueEntityID } from "../../../domain/shared/base/UniqueEntityID";

export abstract class BaseInMemoryRepository<
  T extends Entity<any>
> implements IRepository<T> {

  protected readonly items = new Map<string, T>();

  async findById(
    id: UniqueEntityID
  ): Promise<T | null> {
    return this.items.get(id.toString()) ?? null;
  }

  async exists(
    id: UniqueEntityID
  ): Promise<boolean> {
    return this.items.has(id.toString());
  }

  async save(
    entity: T
  ): Promise<void> {
    this.items.set(entity.id.toString(), entity);
  }

  async delete(
    id: UniqueEntityID
  ): Promise<void> {
    this.items.delete(id.toString());
  }

  protected getAll(): T[] {
    return Array.from(this.items.values());
  }
}