import { AggregateRoot } from "../shared/base/AggregateRoot";
import { UniqueEntityID } from "../shared/base/UniqueEntityID";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

import { Location } from "../location/Location";
import { Severity } from "../shared/common/enums/Severity";
import { DisasterStatus } from "./DisasterStatus";
import { DisasterType } from "./DisasterType";

interface DisasterProps {
  type: DisasterType;
  severity: Severity;
  status: DisasterStatus;
  location: Location;
  description?: string;
  sourceAgency?: string;
  createdAt: Date;
  updatedAt: Date;
}

export class Disaster extends AggregateRoot<DisasterProps> {
  private constructor(props: DisasterProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(
    props: DisasterProps,
    id?: UniqueEntityID
  ): Result<Disaster> {
    const guardResult = Result.combine([
      Guard.againstNullOrUndefined(props.type, "type"),
      Guard.againstNullOrUndefined(props.severity, "severity"),
      Guard.againstNullOrUndefined(props.status, "status"),
      Guard.againstNullOrUndefined(props.location, "location"),
      Guard.againstNullOrUndefined(props.createdAt, "createdAt"),
      Guard.againstNullOrUndefined(props.updatedAt, "updatedAt"),
    ]);

    if (guardResult.isFailure) {
      return Result.fail<Disaster>(guardResult.error!);
    }

    if (props.description) {
      const descriptionResult = Guard.maxLength(
        props.description,
        2000,
        "description"
      );

      if (descriptionResult.isFailure) {
        return Result.fail<Disaster>(descriptionResult.error!);
      }
    }

    if (props.sourceAgency) {
      const agencyResult = Guard.maxLength(
        props.sourceAgency,
        200,
        "sourceAgency"
      );

      if (agencyResult.isFailure) {
        return Result.fail<Disaster>(agencyResult.error!);
      }
    }

    return Result.ok(new Disaster(props, id));
  }

  public get type(): DisasterType {
    return this.props.type;
  }

  public get severity(): Severity {
    return this.props.severity;
  }

  public get status(): DisasterStatus {
    return this.props.status;
  }

  public get location(): Location {
    return this.props.location;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public get sourceAgency(): string | undefined {
    return this.props.sourceAgency;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public activate(): Result<void> {
    return this.changeStatus(DisasterStatus.ACTIVE);
  }

  public contain(): Result<void> {
    return this.changeStatus(DisasterStatus.CONTAINED);
  }

  public resolve(): Result<void> {
    return this.changeStatus(DisasterStatus.RESOLVED);
  }

  public archive(): Result<void> {
    return this.changeStatus(DisasterStatus.ARCHIVED);
  }

  public escalateSeverity(severity: Severity): Result<void> {
    const validation = Guard.againstNullOrUndefined(
      severity,
      "severity"
    );

    if (validation.isFailure) {
      return validation;
    }

    if (this.props.severity === severity) {
      return Result.ok();
    }

    this.props.severity = severity;
    this.touch();

    return Result.ok();
  }

  public relocate(location: Location): Result<void> {
    const validation = Guard.againstNullOrUndefined(
      location,
      "location"
    );

    if (validation.isFailure) {
      return validation;
    }

    if (this.props.location.equals(location)) {
      return Result.ok();
    }

    this.props.location = location;
    this.touch();

    return Result.ok();
  }

  public updateDescription(description: string): Result<void> {
    const validation = Guard.maxLength(
      description,
      2000,
      "description"
    );

    if (validation.isFailure) {
      return validation;
    }

    this.props.description = description;
    this.touch();

    return Result.ok();
  }

  public assignAgency(agency: string): Result<void> {
    const validation = Guard.maxLength(
      agency,
      200,
      "sourceAgency"
    );

    if (validation.isFailure) {
      return validation;
    }

    this.props.sourceAgency = agency;
    this.touch();

    return Result.ok();
  }

  private changeStatus(status: DisasterStatus): Result<void> {
    if (this.props.status === status) {
      return Result.ok();
    }

    this.props.status = status;
    this.touch();

    return Result.ok();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}