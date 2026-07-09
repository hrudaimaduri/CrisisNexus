import { AggregateRoot } from "../shared/base/AggregateRoot";
import { UniqueEntityID } from "../shared/base/UniqueEntityID";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

import { Severity } from "../shared/common/enums/Severity";

interface AlertProps {
  title: string;
  message: string;
  severity: Severity;
  disasterId: UniqueEntityID;
  issuingAgencyId: UniqueEntityID;
  isActive: boolean;
  expiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export class Alert extends AggregateRoot<AlertProps> {
  private constructor(
    props: AlertProps,
    id?: UniqueEntityID
  ) {
    super(props, id);
  }

  public static create(
    props: AlertProps,
    id?: UniqueEntityID
  ): Result<Alert> {
    const validation = Result.combine([
      Guard.againstEmptyString(props.title, "title"),
      Guard.againstEmptyString(props.message, "message"),
      Guard.againstNullOrUndefined(props.severity, "severity"),
      Guard.againstNullOrUndefined(props.disasterId, "disasterId"),
      Guard.againstNullOrUndefined(props.issuingAgencyId, "issuingAgencyId"),
      Guard.againstNullOrUndefined(props.createdAt, "createdAt"),
      Guard.againstNullOrUndefined(props.updatedAt, "updatedAt"),
    ]);

    if (validation.isFailure) {
      return Result.fail<Alert>(validation.error!);
    }

    return Result.ok(new Alert(props, id));
  }

  public get title(): string {
    return this.props.title;
  }

  public get message(): string {
    return this.props.message;
  }

  public get severity(): Severity {
    return this.props.severity;
  }

  public get disasterId(): UniqueEntityID {
    return this.props.disasterId;
  }

  public get issuingAgencyId(): UniqueEntityID {
    return this.props.issuingAgencyId;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get expiresAt(): Date | undefined {
    return this.props.expiresAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public activate(): Result<void> {
    if (this.props.isActive) {
      return Result.ok();
    }

    this.props.isActive = true;
    this.touch();

    return Result.ok();
  }

  public deactivate(): Result<void> {
    if (!this.props.isActive) {
      return Result.ok();
    }

    this.props.isActive = false;
    this.touch();

    return Result.ok();
  }

  public updateMessage(message: string): Result<void> {
    const validation = Guard.againstEmptyString(
      message,
      "message"
    );

    if (validation.isFailure) {
      return validation;
    }

    this.props.message = message;
    this.touch();

    return Result.ok();
  }

  public updateSeverity(
    severity: Severity
  ): Result<void> {
    const validation = Guard.againstNullOrUndefined(
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

  public setExpiry(
    expiresAt: Date
  ): Result<void> {
    const validation = Guard.againstNullOrUndefined(
      expiresAt,
      "expiresAt"
    );

    if (validation.isFailure) {
      return validation;
    }

    this.props.expiresAt = expiresAt;
    this.touch();

    return Result.ok();
  }

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}