import { Incident } from "../../../../domain/incident/Incident";
import { IIncidentRepository } from "../../../../domain/incident/IIncidentRepository";
import { IncidentStatus } from "../../../../domain/incident/IncidentStatus";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";
import { Severity } from "../../../../domain/shared/common/enums/Severity";

import { prisma } from "../PrismaClient";
import { IncidentPersistenceMapper } from "../mappers/IncidentPersistenceMapper";
import { PrismaEnumMapper } from "../mappers/PrismaEnumMapper";

export class PrismaIncidentRepository
  implements IIncidentRepository {

  async findById(
    id: UniqueEntityID
  ): Promise<Incident | null> {

    const record = await prisma.incident.findUnique({

      where: {
        id: id.toString()
      },

      include: {
        disaster: true,
        location: {
          include: {
            coordinates: true
          }
        },
        reportedByAgency: {
          include: {
            location: {
              include: {
                coordinates: true
              }
            }
          }
        }
      }

    });

    if (!record) {
      return null;
    }

    const result =
      IncidentPersistenceMapper.toDomain(
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

    const count = await prisma.incident.count({

      where: {
        id: id.toString()
      }

    });

    return count > 0;

  }

  async save(
    incident: Incident
  ): Promise<void> {

    await prisma.incident.upsert({

      where: {
        id: incident.id.toString()
      },

      create: {

        id: incident.id.toString(),

        disaster: {
          connect: {
            id: incident.disasterId.toString()
          }
        },

        title: incident.title,

        description: incident.description,

        severity: incident.severity,

        status: PrismaEnumMapper.toPrismaIncidentStatus(
          incident.status
        ),

        createdAt: incident.createdAt,

        updatedAt: incident.updatedAt,

        reportedByAgency: incident.reportedByAgencyId
          ? {
              connect: {
                id: incident.reportedByAgencyId.toString()
              }
            }
          : undefined,

        location: {

          create: {

            address:
              incident.location.address?.addressLine,

            city:
              incident.location.address?.city,

            state:
              incident.location.address?.state,

            country:
              incident.location.address?.country,

            postalCode:
              incident.location.address?.postalCode,

            coordinates: {

              create: {

                latitude:
                  incident.location.latitude,

                longitude:
                  incident.location.longitude

              }

            }

          }

        }

      },

      update: {

        title: incident.title,

        description: incident.description,

        severity: incident.severity,

        status: PrismaEnumMapper.toPrismaIncidentStatus(
          incident.status
        ),

        updatedAt: incident.updatedAt,

        reportedByAgency: incident.reportedByAgencyId
          ? {
              connect: {
                id: incident.reportedByAgencyId.toString()
              }
            }
          : undefined,

        location: {

          update: {

            address:
              incident.location.address?.addressLine,

            city:
              incident.location.address?.city,

            state:
              incident.location.address?.state,

            country:
              incident.location.address?.country,

            postalCode:
              incident.location.address?.postalCode,

            coordinates: {

              update: {

                latitude:
                  incident.location.latitude,

                longitude:
                  incident.location.longitude

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

    await prisma.incident.delete({

      where: {
        id: id.toString()
      }

    });

  }

  async findByDisaster(
    disasterId: Incident["disasterId"]
  ): Promise<Incident[]> {

    const records =
      await prisma.incident.findMany({

        where: {
          disasterId: disasterId.toString()
        },

        include: {
          disaster: true,
          location: {
            include: {
              coordinates: true
            }
          },
          reportedByAgency: {
            include: {
              location: {
                include: {
                  coordinates: true
                }
              }
            }
          }
        }

      });

    return records.map(record => {

      const result =
        IncidentPersistenceMapper.toDomain(
          record
        );

      if (result.isFailure) {
        throw new Error(result.error);
      }

      return result.getValue();

    });

  }

  async findOpenIncidents(): Promise<Incident[]> {

    const records =
      await prisma.incident.findMany({

        where: {
          status: {
            not: "RESOLVED"
          }
        },

        include: {
          disaster: true,
          location: {
            include: {
              coordinates: true
            }
          },
          reportedByAgency: {
            include: {
              location: {
                include: {
                  coordinates: true
                }
              }
            }
          }
        }

      });

    return records.map(record => {

      const result =
        IncidentPersistenceMapper.toDomain(
          record
        );

      if (result.isFailure) {
        throw new Error(result.error);
      }

      return result.getValue();

    });

  }

}