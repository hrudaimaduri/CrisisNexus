import { AggregateRoot } from "../shared/base/AggregateRoot";
import { UniqueEntityID } from "../shared/base/UniqueEntityID";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

import { Location } from "../location/Location";

interface AgencyProps {
  name: string;
  description?: string;
  contactNumber?: string;
  email?: string;
  website?: string;
  location: Location;
  createdAt: Date;
  updatedAt: Date;
}

export class Agency extends AggregateRoot<AgencyProps> {
  private constructor(
    props: AgencyProps,
    id?: UniqueEntityID
  ) {
    super(props, id);
  }

  public static create(
    props: AgencyProps,
    id?: UniqueEntityID
  ): Result<Agency> {

    const validation = Result.combine([
      Guard.againstEmptyString(
        props.name,
        "name"
      ),
      Guard.againstNullOrUndefined(
        props.location,
        "location"
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
      return Result.fail(validation.error!);
    }

    return Result.ok(
      new Agency(props, id)
    );
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public get contactNumber(): string | undefined {
    return this.props.contactNumber;
  }

  public get email(): string | undefined {
    return this.props.email;
  }

  public get website(): string | undefined {
    return this.props.website;
  }

  public get location(): Location {
    return this.props.location;
  }

  public rename(name: string): Result<void> {

    const validation =
      Guard.againstEmptyString(
        name,
        "name"
      );

    if (validation.isFailure) {
      return validation;
    }

    this.props.name = name;
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

  public updateDescription(
    description: string
  ): Result<void> {

    this.props.description = description;
    this.touch();

    return Result.ok();
  }

  public updateContactNumber(
    contactNumber: string
  ): Result<void> {

    this.props.contactNumber =
      contactNumber;

    this.touch();

    return Result.ok();
  }

  public updateEmail(
    email: string
  ): Result<void> {

    this.props.email = email;
    this.touch();

    return Result.ok();
  }

  public updateWebsite(
    website: string
  ): Result<void> {

    this.props.website = website;
    this.touch();

    return Result.ok();
  }

  private touch(): void {
    this.props.updatedAt =
      new Date();
  }
}