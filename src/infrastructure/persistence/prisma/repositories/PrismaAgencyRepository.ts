import { Agency } from "../../../../domain/agency/Agency";
import { IAgencyRepository } from "../../../../domain/agency/IAgencyRepository";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";

import { prisma } from "../PrismaClient";
import { AgencyPersistenceMapper } from "../mappers/AgencyPersistenceMapper";

export class PrismaAgencyRepository implements IAgencyRepository {

  async findById(
    id: UniqueEntityID
  ): Promise<Agency | null> {

    const record = await prisma.agency.findUnique({
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

    const agencyResult =
      AgencyPersistenceMapper.toDomain(record);

    if (agencyResult.isFailure) {
      throw new Error(agencyResult.error);
    }

    return agencyResult.getValue();
  }

  async exists(
    id: UniqueEntityID
  ): Promise<boolean> {

    const count = await prisma.agency.count({
      where: {
        id: id.toString()
      }
    });

    return count > 0;
  }
  
  async save(
      agency: Agency
    ): Promise<void> {

      await prisma.agency.upsert({

        where: {
          id: agency.id.toString()
        },

        create: {

          id: agency.id.toString(),

          name: agency.name,

          description: agency.description,

          contactNumber: agency.contactNumber,

          email: agency.email,

          website: agency.website,

          createdAt: agency.createdAt,

          updatedAt: agency.updatedAt,

          location: {

            create: {

              address:
                agency.location.address?.addressLine,

              city:
                agency.location.address?.city,

              state:
                agency.location.address?.state,

              country:
                agency.location.address?.country,

              postalCode:
                agency.location.address?.postalCode,

              coordinates: {

                create: {

                  latitude:
                    agency.location.latitude,

                  longitude:
                    agency.location.longitude

                }

              }

            }

          }

        },

        update: {

          name:
            agency.name,

          description:
            agency.description,

          contactNumber:
            agency.contactNumber,

          email:
            agency.email,

          website:
            agency.website,

          updatedAt:
            agency.updatedAt,

          location: {

            update: {

              address:
                agency.location.address?.addressLine,

              city:
                agency.location.address?.city,

              state:
                agency.location.address?.state,

              country:
                agency.location.address?.country,

              postalCode:
                agency.location.address?.postalCode,

              coordinates: {

                update: {

                  latitude:
                    agency.location.latitude,

                  longitude:
                    agency.location.longitude

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

    await prisma.agency.delete({
      where: {
        id: id.toString()
      }
    });

  }

  async findByName(
    name: string
  ): Promise<Agency | null> {

    const record = await prisma.agency.findFirst({

      where: {
        name
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

    const agencyResult =
      AgencyPersistenceMapper.toDomain(record);

    if (agencyResult.isFailure) {
      throw new Error(agencyResult.error);
    }

    return agencyResult.getValue();
  }

}