import {
  DisasterStatus as PrismaDisasterStatus,
  DisasterType as PrismaDisasterType,
  IncidentStatus as PrismaIncidentStatus,
  Severity as PrismaSeverity
} from "@prisma/client";

import { DisasterStatus } from "../../../../domain/disaster/DisasterStatus";
import { DisasterType } from "../../../../domain/disaster/DisasterType";
import { IncidentStatus } from "../../../../domain/incident/IncidentStatus";
import { Severity } from "../../../../domain/shared/common/enums/Severity";

export class PrismaEnumMapper {

  public static toDisasterType(
    value: PrismaDisasterType
  ): DisasterType {

    switch (value) {

      case PrismaDisasterType.FLOOD:
        return DisasterType.FLOOD;

      case PrismaDisasterType.CYCLONE:
        return DisasterType.CYCLONE;

      case PrismaDisasterType.EARTHQUAKE:
        return DisasterType.EARTHQUAKE;

      case PrismaDisasterType.FIRE:
        return DisasterType.FIRE;

      case PrismaDisasterType.LANDSLIDE:
        return DisasterType.LANDSLIDE;

      case PrismaDisasterType.TSUNAMI:
        return DisasterType.TSUNAMI;

      case PrismaDisasterType.DROUGHT:
        return DisasterType.DROUGHT;

      case PrismaDisasterType.OTHER:
        return DisasterType.OTHER;

      default:
        throw new Error(
          `Unsupported DisasterType: ${value}`
        );

    }

  }

  public static toSeverity(
    value: PrismaSeverity
  ): Severity {

    switch (value) {

      case PrismaSeverity.LOW:
        return Severity.LOW;

      case PrismaSeverity.MEDIUM:
        return Severity.MEDIUM;

      case PrismaSeverity.HIGH:
        return Severity.HIGH;

      case PrismaSeverity.CRITICAL:
        return Severity.CRITICAL;

      default:
        throw new Error(
          `Unsupported Severity: ${value}`
        );

    }

  }

  public static toDisasterStatus(
    value: PrismaDisasterStatus
  ): DisasterStatus {

    switch (value) {

      case PrismaDisasterStatus.MONITORING:
        return DisasterStatus.MONITORING;

      case PrismaDisasterStatus.ACTIVE:
        return DisasterStatus.ACTIVE;

      case PrismaDisasterStatus.CONTAINED:
        return DisasterStatus.CONTAINED;

      case PrismaDisasterStatus.RESOLVED:
        return DisasterStatus.RESOLVED;

      case PrismaDisasterStatus.ARCHIVED:
        return DisasterStatus.ARCHIVED;

      default:
        throw new Error(
          `Unsupported DisasterStatus: ${value}`
        );

    }

  }

  public static toIncidentStatus(
    value: PrismaIncidentStatus
  ): IncidentStatus {

    switch (value) {

      case PrismaIncidentStatus.REPORTED:
        return IncidentStatus.REPORTED;

      case PrismaIncidentStatus.VERIFIED:
        return IncidentStatus.VERIFIED;

      case PrismaIncidentStatus.IN_PROGRESS:
        return IncidentStatus.IN_PROGRESS;

      case PrismaIncidentStatus.RESOLVED:
        return IncidentStatus.RESOLVED;

      case PrismaIncidentStatus.CLOSED:
        return IncidentStatus.CLOSED;

      default:
        throw new Error(
          `Unsupported IncidentStatus: ${value}`
        );

    }

  }

  public static toPrismaIncidentStatus(
    value: IncidentStatus
  ): PrismaIncidentStatus {

    switch (value) {

      case IncidentStatus.REPORTED:
        return PrismaIncidentStatus.REPORTED;

      case IncidentStatus.VERIFIED:
        return PrismaIncidentStatus.VERIFIED;

      case IncidentStatus.IN_PROGRESS:
        return PrismaIncidentStatus.IN_PROGRESS;

      case IncidentStatus.RESOLVED:
        return PrismaIncidentStatus.RESOLVED;

      case IncidentStatus.CLOSED:
        return PrismaIncidentStatus.CLOSED;

      default:
        throw new Error(
          `Unsupported IncidentStatus: ${value}`
        );

    }

  }

}