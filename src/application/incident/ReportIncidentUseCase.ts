import { IUseCase } from "../common/IUseCase";
import { ApplicationResult } from "../common/ApplicationResult";

import { ReportIncidentCommand } from "./commands/ReportIncidentCommand";
import { ReportIncidentResponse } from "./dto/ReportIncidentResponse";

import { IIncidentRepository } from "../../domain/incident/IIncidentRepository";

import { IncidentMapper } from "./mappers/IncidentMapper";

export class ReportIncidentUseCase
  implements
    IUseCase<
      ReportIncidentCommand,
      ApplicationResult<ReportIncidentResponse>
    >
{
  constructor(
    private readonly incidentRepository: IIncidentRepository
  ) {}

  public async execute(
    command: ReportIncidentCommand
  ): Promise<ApplicationResult<ReportIncidentResponse>> {
    const mapper = new IncidentMapper();

    const incidentResult = mapper.toDomain(command);

    if (incidentResult.isFailure) {
      return ApplicationResult.fail(
        incidentResult.error!
      );
    }

    const incident = incidentResult.getValue();

    await this.incidentRepository.save(incident);

    return ApplicationResult.ok(
      mapper.toResponse(incident)
    );
  }
}