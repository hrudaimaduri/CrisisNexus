import { Severity } from "../../../domain/shared/common/enums/Severity";

export interface ReportIncidentCommand {
  disasterId: string;

  title: string;

  description?: string;

  latitude: number;

  longitude: number;

  severity: Severity;

  reportedByAgencyId?: string;
}