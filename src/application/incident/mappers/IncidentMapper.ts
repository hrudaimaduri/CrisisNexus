import { IMapper } from "../../common/mappers/IMapper";

import { Incident } from "../../../domain/incident/Incident";
import { IncidentStatus } from "../../../domain/incident/IncidentStatus";

import { Coordinates } from "../../../domain/location/Coordinates";
import { Location } from "../../../domain/location/Location";

import { UniqueEntityID } from "../../../domain/shared/base/UniqueEntityID";
import { Result } from "../../../domain/shared/result/Result";

import { ReportIncidentCommand } from "../commands/ReportIncidentCommand";
import { ReportIncidentResponse } from "../dto/ReportIncidentResponse";

export class IncidentMapper
  implements
    IMapper<
      Incident,
      ReportIncidentCommand,
      ReportIncidentResponse
    >
{
  public toDomain(
    command: ReportIncidentCommand
  ): Result<Incident> {
    const coordinatesResult = Coordinates.create({
      latitude: command.latitude,
      longitude: command.longitude,
    });

    if (coordinatesResult.isFailure) {
      return Result.fail<Incident>(coordinatesResult.error!);
    }

    const locationResult = Location.create({
      coordinates: coordinatesResult.getValue(),
    });

    if (locationResult.isFailure) {
      return Result.fail<Incident>(locationResult.error!);
    }

    return Incident.create({
      disasterId: new UniqueEntityID(command.disasterId),

      title: command.title,

      description: command.description,

      location: locationResult.getValue(),

      severity: command.severity,

      status: IncidentStatus.REPORTED,

      reportedByAgencyId: command.reportedByAgencyId
        ? new UniqueEntityID(command.reportedByAgencyId)
        : undefined,

      createdAt: new Date(),

      updatedAt: new Date(),
    });
  }

  public toResponse(
    incident: Incident
  ): ReportIncidentResponse {
    return {
      incidentId: incident.id.toString(),
      message: "Incident reported successfully.",
    };
  }
}