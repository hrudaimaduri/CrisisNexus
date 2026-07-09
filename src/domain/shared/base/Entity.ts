import { UniqueEntityID } from "./UniqueEntityID";

export abstract class Entity<T> {


  protected readonly props: T;

   private readonly _id: UniqueEntityID;
  

  protected constructor(props: T, id?: UniqueEntityID) {
    this.props = props;
    this._id = id ?? new UniqueEntityID();
    
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