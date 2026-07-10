import { Prisma } from "@prisma/client";

export type AgencyRecord = Prisma.AgencyGetPayload<{
  include: {
    location: {
      include: {
        coordinates: true;
      };
    };
  };
}>;

export type DisasterRecord = Prisma.DisasterGetPayload<{
  include: {
    location: {
      include: {
        coordinates: true;
      };
    };
  };
}>;

export type ShelterRecord = Prisma.ShelterGetPayload<{
  include: {
    location: {
      include: {
        coordinates: true;
      };
    };
    managingAgency: {
      include: {
        location: {
          include: {
            coordinates: true;
          };
        };
      };
    };
  };
}>;

export type IncidentRecord = Prisma.IncidentGetPayload<{
  include: {
    disaster: true;
    location: {
      include: {
        coordinates: true;
      };
    };
    reportedByAgency: {
      include: {
        location: {
          include: {
            coordinates: true;
          };
        };
      };
    };
  };
}>;