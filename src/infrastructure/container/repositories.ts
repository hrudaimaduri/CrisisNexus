import { PrismaAgencyRepository } from "../persistence/prisma/repositories/PrismaAgencyRepository";
import { PrismaDisasterRepository } from "../persistence/prisma/repositories/PrismaDisasterRepository";
import { PrismaShelterRepository } from "../persistence/prisma/repositories/PrismaShelterRepository";
import { PrismaIncidentRepository } from "../persistence/prisma/repositories/PrismaIncidentRepository";

export const agencyRepository =
  new PrismaAgencyRepository();

export const disasterRepository =
  new PrismaDisasterRepository();

export const shelterRepository =
  new PrismaShelterRepository();

export const incidentRepository =
  new PrismaIncidentRepository();