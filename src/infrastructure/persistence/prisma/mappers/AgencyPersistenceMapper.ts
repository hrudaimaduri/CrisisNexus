import { Agency } from "../../../../domain/agency/Agency";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";
import { Result } from "../../../../domain/shared/result/Result";

import { AgencyRecord } from "../types/PrismaPayloads";
import { BaseLocationMapper } from "./BaseLocationMapper";

export class AgencyPersistenceMapper {

  public static toDomain(
    record: AgencyRecord
  ): Result<Agency> {

    if (!record.location) {
      return Result.fail<Agency>(
        "Agency location is missing."
      );
    }

    const locationResult =
      BaseLocationMapper.toDomain(
        record.location
      );

    if (locationResult.isFailure) {
      return Result.fail<Agency>(
        locationResult.error!
      );
    }

    return Agency.create(
      {
        name: record.name,

        description:
          record.description ?? undefined,

        contactNumber:
          record.contactNumber ?? undefined,

        email:
          record.email ?? undefined,

        website:
          record.website ?? undefined,

        location:
          locationResult.getValue(),

        createdAt:
          record.createdAt,

        updatedAt:
          record.updatedAt

      },

      new UniqueEntityID(
        record.id
      )

    );

  }

}