import { IRepository } from "../shared/repository/IRepository";
import { Shelter } from "./shelter";

export interface IShelterRepository
  extends IRepository<Shelter> {

  findOpenShelters(): Promise<Shelter[]>;

  findAvailableShelters(): Promise<Shelter[]>;
}