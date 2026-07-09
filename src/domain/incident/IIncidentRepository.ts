import { IRepository } from "../shared/repository/IRepository";
import { Incident } from "./Incident";

export interface IIncidentRepository
  extends IRepository<Incident> {

  findByDisaster(
    disasterId: Incident["disasterId"]
  ): Promise<Incident[]>;

  findOpenIncidents(): Promise<Incident[]>;
}