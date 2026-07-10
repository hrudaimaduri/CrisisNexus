import { ReportIncidentUseCase } from "../../application/incident/ReportIncidentUseCase";

import {
  incidentRepository
} from "./repositories";

export const reportIncidentUseCase =
  new ReportIncidentUseCase(
    incidentRepository
  );