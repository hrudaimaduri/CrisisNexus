import { BaseInMemoryRepository } from "./BaseInMemoryRepository";

import { Disaster } from "../../../domain/disaster/Disaster";
import { DisasterStatus } from "../../../domain/disaster/DisasterStatus";
import { DisasterType } from "../../../domain/disaster/DisasterType";
import { IDisasterRepository } from "../../../domain/disaster/IDisasterRepository";

export class InMemoryDisasterRepository
  extends BaseInMemoryRepository<Disaster>
  implements IDisasterRepository {

  async findActiveDisasters(): Promise<Disaster[]> {
    return this.getAll().filter(
      disaster =>
        disaster.status !== DisasterStatus.RESOLVED &&
        disaster.status !== DisasterStatus.ARCHIVED
    );
  }

  async findByType(
    type: DisasterType
  ): Promise<Disaster[]> {
    return this.getAll().filter(
      disaster => disaster.type === type
    );
  }

  async findBySeverity(
    severity: Disaster["severity"]
  ): Promise<Disaster[]> {
    return this.getAll().filter(
      disaster => disaster.severity === severity
    );
  }
}