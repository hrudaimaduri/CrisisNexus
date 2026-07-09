import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {

  protected readonly _id: UniqueEntityID;
  protected readonly props: T;

  protected constructor(props: T, id?: UniqueEntityID) {
    this._id = id ?? new UniqueEntityID();
    this.props = props;
  }

  get id(): UniqueEntityID {
    return this._id;
  }

  public equals(object?: Entity<T>): boolean {

    if (object == null) {
      return false;
    }

    if (this === object) {
      return true;
    }

    return this._id.equals(object._id);
  }

}