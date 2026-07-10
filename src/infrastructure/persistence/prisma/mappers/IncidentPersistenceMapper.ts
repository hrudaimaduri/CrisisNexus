import { Incident } from "../../../../domain/incident/Incident";
import { IncidentStatus } from "../../../../domain/incident/IncidentStatus";
import { Result } from "../../../../domain/shared/result/Result";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";

import { IncidentRecord } from "../types/PrismaPayloads";
import { BaseLocationMapper } from "./BaseLocationMapper";
import { PrismaEnumMapper } from "./PrismaEnumMapper";

export class IncidentPersistenceMapper {

  public static toDomain(
    record: IncidentRecord
  ): Result<Incident> {

    if (!record.location) {
      return Result.fail<Incident>(
        "Incident location is missing."
      );
    }

    const locationResult =
      BaseLocationMapper.toDomain(
        record.location
      );

    if (locationResult.isFailure) {
      return Result.fail<Incident>(
        locationResult.error!
      );
    }

    return Incident.create(
      {
        disasterId:
          new UniqueEntityID(
            record.disasterId
          ),

        title:
          record.title,

        description:
          record.description ?? undefined,

        location:
          locationResult.getValue(),

        severity:
          PrismaEnumMapper.toSeverity(
            record.severity
          ),

        status:
          record.status as IncidentStatus,

        reportedByAgencyId:
          record.reportedByAgencyId
            ? new UniqueEntityID(
                record.reportedByAgencyId
              )
            : undefined,

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