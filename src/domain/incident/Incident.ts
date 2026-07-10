import { AggregateRoot } from "../shared/base/AggregateRoot";
import { UniqueEntityID } from "../shared/base/UniqueEntityID";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

import { IncidentStatus } from "./IncidentStatus";
import { Location } from "../location/Location";
import { Severity } from "../shared/common/enums/Severity";

interface IncidentProps {
  disasterId: UniqueEntityID;
  title: string;
  description?: string;
  location: Location;
  severity: Severity;
  status: IncidentStatus;
  reportedByAgencyId?: UniqueEntityID;
  createdAt: Date;
  updatedAt: Date;
}

export class Incident extends AggregateRoot<IncidentProps> {
  private constructor(
    props: IncidentProps,
    id?: UniqueEntityID
  ) {
    super(props, id);
  }

  public static create(
    props: IncidentProps,
    id?: UniqueEntityID
  ): Result<Incident> {

    const validation = Result.combine([
      Guard.againstNullOrUndefined(
        props.disasterId,
        "disasterId"
      ),
      Guard.againstEmptyString(
        props.title,
        "title"
      ),
      Guard.againstNullOrUndefined(
        props.location,
        "location"
      ),
      Guard.againstNullOrUndefined(
        props.severity,
        "severity"
      ),
      Guard.againstNullOrUndefined(
        props.status,
        "status"
      ),
      Guard.againstNullOrUndefined(
        props.createdAt,
        "createdAt"
      ),
      Guard.againstNullOrUndefined(
        props.updatedAt,
        "updatedAt"
      )
    ]);

    if (validation.isFailure) {
      return Result.fail<Incident>(
        validation.error!
      );
    }

    return Result.ok(
      new Incident(props, id)
    );
  }

  public get disasterId(): UniqueEntityID {
    return this.props.disasterId;
  }

  public get title(): string {
    return this.props.title;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public get location(): Location {
    return this.props.location;
  }

  public get severity(): Severity {
    return this.props.severity;
  }

  public get status(): IncidentStatus {
    return this.props.status;
  }

  public get reportedByAgencyId():
    | UniqueEntityID
    | undefined {
    return this.props.reportedByAgencyId;
  }
  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public assignReportingAgency(
    agencyId: UniqueEntityID
  ): Result<void> {

    const validation =
      Guard.againstNullOrUndefined(
        agencyId,
        "agencyId"
      );

    if (validation.isFailure) {
      return validation;
    }

    this.props.reportedByAgencyId =
      agencyId;

    this.touch();

    return Result.ok();
  }

  public relocate(
    location: Location
  ): Result<void> {

    const validation =
      Guard.againstNullOrUndefined(
        location,
        "location"
      );

    if (validation.isFailure) {
      return validation;
    }

    this.props.location = location;

    this.touch();

    return Result.ok();
  }

  public updateSeverity(
    severity: Severity
  ): Result<void> {

    const validation =
      Guard.againstNullOrUndefined(
        severity,
        "severity"
      );

    if (validation.isFailure) {
      return validation;
    }

    this.props.severity = severity;

    this.touch();

    return Result.ok();
  }

  public resolve(): Result<void> {
    this.props.status =
      IncidentStatus.RESOLVED;

    this.touch();

    return Result.ok();
  }

  public updateDescription(
    description: string
  ): Result<void> {

    this.props.description =
      description;

    this.touch();

    return Result.ok();
  }

  private touch(): void {
    this.props.updatedAt =
      new Date();
  }
}