import { BaseInMemoryRepository } from "./BaseInMemoryRepository";

import { Agency } from "../../../domain/agency/Agency";
import { IAgencyRepository } from "../../../domain/agency/IAgencyRepository";

export class InMemoryAgencyRepository
  extends BaseInMemoryRepository<Agency>
  implements IAgencyRepository {

  async findByName(
    name: Agency["name"]
  ): Promise<Agency | null> {

    return (
      this.getAll().find(
        agency => agency.name === name
      ) ?? null
    );
  }
}