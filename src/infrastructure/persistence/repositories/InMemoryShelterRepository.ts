import { BaseInMemoryRepository } from "./BaseInMemoryRepository";

import { IShelterRepository } from "../../../domain/shelter/IShelterRepository";
import { Shelter } from "../../../domain/shelter/shelter";

export class InMemoryShelterRepository
  extends BaseInMemoryRepository<Shelter>
  implements IShelterRepository {

  async findOpenShelters(): Promise<Shelter[]> {
    return this.getAll().filter(
      shelter => shelter.isOpen
    );
  }

  async findAvailableShelters(): Promise<Shelter[]> {
    return this.getAll().filter(
      shelter =>
        shelter.isOpen &&
        shelter.currentOccupancy < shelter.capacity
    );
  }
}