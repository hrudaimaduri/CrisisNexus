import { Shelter } from "../../../../domain/shelter/shelter";
import { IShelterRepository } from "../../../../domain/shelter/IShelterRepository";
import { UniqueEntityID } from "../../../../domain/shared/base/UniqueEntityID";

import { prisma } from "../PrismaClient";
import { ShelterPersistenceMapper } from "../mappers/ShelterPersistenceMapper";

export class PrismaShelterRepository
  implements IShelterRepository {

  async findById(
    id: UniqueEntityID
  ): Promise<Shelter | null> {

    const record = await prisma.shelter.findUnique({

      where: {
        id: id.toString()
      },

      include: {
        location: {
          include: {
            coordinates: true
          }
        },
        managingAgency: {
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
      ShelterPersistenceMapper.toDomain(record);

    if (result.isFailure) {
      throw new Error(result.error);
    }

    return result.getValue();

  }

  async exists(
    id: UniqueEntityID
  ): Promise<boolean> {

    const count =
      await prisma.shelter.count({

        where: {
          id: id.toString()
        }

      });

    return count > 0;

  }

  async save(
    shelter: Shelter
  ): Promise<void> {

    await prisma.shelter.upsert({

      where: {
        id: shelter.id.toString()
      },

      create: {

        id: shelter.id.toString(),

        name: shelter.name,

        capacity: shelter.capacity,

        currentOccupancy:
          shelter.currentOccupancy,

        isOpen: shelter.isOpen,

        createdAt:
          shelter.createdAt,

        updatedAt:
          shelter.updatedAt,

        managingAgency: {
          connect: {
            id:
              shelter.managingAgencyId.toString()
          }
        },

        location: {

          create: {

            address:
              shelter.location.address?.addressLine,

            city:
              shelter.location.address?.city,

            state:
              shelter.location.address?.state,

            country:
              shelter.location.address?.country,

            postalCode:
              shelter.location.address?.postalCode,

            coordinates: {

              create: {

                latitude:
                  shelter.location.latitude,

                longitude:
                  shelter.location.longitude

              }

            }

          }

        }

      },

      update: {

        name:
          shelter.name,

        capacity:
          shelter.capacity,

        currentOccupancy:
          shelter.currentOccupancy,

        isOpen:
          shelter.isOpen,

        updatedAt:
          shelter.updatedAt,

        managingAgency: {

          connect: {
            id:
              shelter.managingAgencyId.toString()
          }

        },

        location: {

          update: {

            address:
              shelter.location.address?.addressLine,

            city:
              shelter.location.address?.city,

            state:
              shelter.location.address?.state,

            country:
              shelter.location.address?.country,

            postalCode:
              shelter.location.address?.postalCode,

            coordinates: {

              update: {

                latitude:
                  shelter.location.latitude,

                longitude:
                  shelter.location.longitude

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

    await prisma.shelter.delete({

      where: {
        id: id.toString()
      }

    });

  }

  async findOpenShelters(): Promise<Shelter[]> {

    const records =
      await prisma.shelter.findMany({

        where: {
          isOpen: true
        },

        include: {
          location: {
            include: {
              coordinates: true
            }
          },
          managingAgency: {
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
        ShelterPersistenceMapper.toDomain(record);

      if (result.isFailure) {
        throw new Error(result.error);
      }

      return result.getValue();

    });

  }

  async findAvailableShelters(): Promise<Shelter[]> {

    const records =
      await prisma.shelter.findMany({

        where: {
          isOpen: true
        },

        include: {
          location: {
            include: {
              coordinates: true
            }
          },
          managingAgency: {
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

    return records
      .map(record => {

        const result =
          ShelterPersistenceMapper.toDomain(record);

        if (result.isFailure) {
          throw new Error(result.error);
        }

        return result.getValue();

      })
      .filter(
        shelter =>
          shelter.currentOccupancy <
          shelter.capacity
      );

  }

}