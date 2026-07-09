import { IRepository } from "../shared/repository/IRepository";
import { Agency } from "./Agency";

export interface IAgencyRepository
  extends IRepository<Agency> {

  findByName(
    name: string
  ): Promise<Agency | null>;
}