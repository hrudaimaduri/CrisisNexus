import { Disaster } from "../../../../domain/disaster/Disaster";
import { Result } from "../../../../domain/shared/result/Result";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";

import { DisasterRecord } from "../types/PrismaPayloads";
import { BaseLocationMapper } from "./BaseLocationMapper";
import { PrismaEnumMapper } from "./PrismaEnumMapper";

export class DisasterPersistenceMapper {

  public static toDomain(
    record: DisasterRecord
  ): Result<Disaster> {

    if (!record.location) {
      return Result.fail<Disaster>(
        "Disaster location is missing."
      );
    }

    const locationResult =
      BaseLocationMapper.toDomain(
        record.location
      );

    if (locationResult.isFailure) {
      return Result.fail<Disaster>(
        locationResult.error!
      );
    }

    return Disaster.create(
      {
        type: PrismaEnumMapper.toDisasterType(
        record.type
        ),

        severity: PrismaEnumMapper.toSeverity(
        record.severity
        ),

        status: PrismaEnumMapper.toDisasterStatus(
        record.status
        ),

        description:
          record.description ?? undefined,

        sourceAgency:
          record.sourceAgency ?? undefined,

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