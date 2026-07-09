import { IIncidentRepository } from "../../../domain/incident/IIncidentRepository";
import { Incident } from "../../../domain/incident/Incident";
import { UniqueEntityID } from "../../../domain/shared/base/UniqueEntityID";
import { IncidentStatus } from "../../../domain/incident/IncidentStatus";

export class InMemoryIncidentRepository
  implements IIncidentRepository {

  private readonly incidents = new Map<string, Incident>();

  async findById(
    id: UniqueEntityID
  ): Promise<Incident | null> {

    return this.incidents.get(id.toString()) ?? null;
  }

  async exists(
    id: UniqueEntityID
  ): Promise<boolean> {

    return this.incidents.has(id.toString());
  }

  async save(
    incident: Incident
  ): Promise<void> {

    this.incidents.set(
      incident.id.toString(),
      incident
    );
  }

  async delete(
    id: UniqueEntityID
  ): Promise<void> {

    this.incidents.delete(id.toString());
  }

  async findByDisaster(
    disasterId: UniqueEntityID
  ): Promise<Incident[]> {

    return [...this.incidents.values()]
      .filter(
        incident =>
          incident.disasterId.equals(disasterId)
      );
  }

  async findOpenIncidents(): Promise<Incident[]> {

    return [...this.incidents.values()]
      .filter(
        incident =>
            
          incident.status !== IncidentStatus.RESOLVED
        
      );
  }
}