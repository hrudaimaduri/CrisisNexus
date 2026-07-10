import { Disaster } from "../../../../domain/disaster/Disaster";
import { IDisasterRepository } from "../../../../domain/disaster/IDisasterRepository";
import { DisasterStatus } from "../../../../domain/disaster/DisasterStatus";
import { DisasterType } from "../../../../domain/disaster/DisasterType";
import { Severity } from "../../../../domain/shared/common/enums/Severity";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";

import { prisma } from "../PrismaClient";
import { DisasterPersistenceMapper } from "../mappers/DisasterPersistenceMapper";

export class PrismaDisasterRepository
  implements IDisasterRepository {

  async findById(
    id: UniqueEntityID
  ): Promise<Disaster | null> {

    const record =
      await prisma.disaster.findUnique({

        where: {
          id: id.toString()
        },

        include: {
          location: {
            include: {
              coordinates: true
            }
          }
        }

      });

    if (!record) {
      return null;
    }

    const result =
      DisasterPersistenceMapper.toDomain(
        record
      );

    if (result.isFailure) {
      throw new Error(result.error);
    }

    return result.getValue();

  }

  async exists(
    id: UniqueEntityID
  ): Promise<boolean> {

    const count =
      await prisma.disaster.count({

        where: {
          id: id.toString()
        }

      });

    return count > 0;

  }

  async save(
    disaster: Disaster
  ): Promise<void> {

    await prisma.disaster.upsert({

      where: {
        id: disaster.id.toString()
      },

      create: {

        id: disaster.id.toString(),

        type: disaster.type,

        severity: disaster.severity,

        status: disaster.status,

        description:
          disaster.description,

        sourceAgency:
          disaster.sourceAgency,

        createdAt:
          disaster.createdAt,

        updatedAt:
          disaster.updatedAt,

        location: {

          create: {

            address:
              disaster.location.address?.addressLine,

            city:
              disaster.location.address?.city,

            state:
              disaster.location.address?.state,

            country:
              disaster.location.address?.country,

            postalCode:
              disaster.location.address?.postalCode,

            coordinates: {

              create: {

                latitude:
                  disaster.location.latitude,

                longitude:
                  disaster.location.longitude

              }

            }

          }

        }

      },

      update: {

        type:
          disaster.type,

        severity:
          disaster.severity,

        status:
          disaster.status,

        description:
          disaster.description,

        sourceAgency:
          disaster.sourceAgency,

        updatedAt:
          disaster.updatedAt,

        location: {

          update: {

            address:
              disaster.location.address?.addressLine,

            city:
              disaster.location.address?.city,

            state:
              disaster.location.address?.state,

            country:
              disaster.location.address?.country,

            postalCode:
              disaster.location.address?.postalCode,

            coordinates: {

              update: {

                latitude:
                  disaster.location.latitude,

                longitude:
                  disaster.location.longitude

              }

            }

          }

        }

      }

    });

  }

  async delete(
    id: UniqueEntityID
  ): Promise<void> {

    await prisma.disaster.delete({

      where: {
        id: id.toString()
      }

    });

  }

  async findActiveDisasters(): Promise<Disaster[]> {

    const records =
      await prisma.disaster.findMany({

        where: {
          status: "ACTIVE"
        },

        include: {
          location: {
            include: {
              coordinates: true
            }
          }
        }

      });

    return records.map(record => {

      const result =
        DisasterPersistenceMapper.toDomain(
          record
        );

      if (result.isFailure) {
        throw new Error(result.error);
      }

      return result.getValue();

    });

  }

  async findByType(
    type: DisasterType
  ): Promise<Disaster[]> {

    const records =
      await prisma.disaster.findMany({

        where: {
          type
        },

        include: {
          location: {
            include: {
              coordinates: true
            }
          }
        }

      });

    return records.map(record => {

      const result =
        DisasterPersistenceMapper.toDomain(
          record
        );

      if (result.isFailure) {
        throw new Error(result.error);
      }

      return result.getValue();

    });

  }

  async findBySeverity(
    severity: Severity
  ): Promise<Disaster[]> {

    const records =
      await prisma.disaster.findMany({

        where: {
          severity
        },

        include: {
          location: {
            include: {
              coordinates: true
            }
          }
        }

      });

    return records.map(record => {

      const result =
        DisasterPersistenceMapper.toDomain(
          record
        );

      if (result.isFailure) {
        throw new Error(result.error);
      }

      return result.getValue();

    });

  }

}