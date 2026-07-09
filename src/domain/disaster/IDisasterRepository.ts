import { IRepository } from "../shared/repository/IRepository";
import { Disaster } from "./Disaster";

export interface IDisasterRepository
  extends IRepository<Disaster> {

  findActiveDisasters(): Promise<Disaster[]>;

  findByType(
    type: Disaster["type"]
  ): Promise<Disaster[]>;

  findBySeverity(
    severity: Disaster["severity"]
  ): Promise<Disaster[]>;
}