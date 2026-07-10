import { Shelter } from "../../../../domain/shelter/shelter";
import { Result } from "../../../../domain/shared/result/Result";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";

import { ShelterRecord } from "../types/PrismaPayloads";
import { BaseLocationMapper } from "./BaseLocationMapper";

export class ShelterPersistenceMapper {

  public static toDomain(
    record: ShelterRecord
  ): Result<Shelter> {

    if (!record.location) {
      return Result.fail<Shelter>(
        "Shelter location is missing."
      );
    }

    const locationResult =
      BaseLocationMapper.toDomain(
        record.location
      );

    if (locationResult.isFailure) {
      return Result.fail<Shelter>(
        locationResult.error!
      );
    }

    return Shelter.create(
      {
        name: record.name,

        location:
          locationResult.getValue(),

        managingAgencyId:
          new UniqueEntityID(
            record.managingAgencyId
          ),

        capacity:
          record.capacity,

        currentOccupancy:
          record.currentOccupancy,

        isOpen:
          record.isOpen,

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