import { BaseInMemoryRepository } from "./BaseInMemoryRepository";

import { IIncidentRepository } from "../../../domain/incident/IIncidentRepository";
import { Incident } from "../../../domain/incident/Incident";
import { IncidentStatus } from "../../../domain/incident/IncidentStatus";
import { UniqueEntityID } from "../../../domain/shared/base/UniqueEntityID";

export class InMemoryIncidentRepository
  extends BaseInMemoryRepository<Incident>
  implements IIncidentRepository {

  async findByDisaster(
    disasterId: UniqueEntityID
  ): Promise<Incident[]> {
    return this.getAll().filter(
      incident =>
        incident.disasterId.equals(disasterId)
    );
  }

  async findOpenIncidents(): Promise<Incident[]> {
    return this.getAll().filter(
      incident =>
        incident.status !== IncidentStatus.RESOLVED
    );
  }
}