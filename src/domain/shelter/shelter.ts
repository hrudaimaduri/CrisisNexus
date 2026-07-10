import { AggregateRoot } from "../shared/base/AggregateRoot";
import { UniqueEntityID } from "../shared/base/UniqueEntityID";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

import { Location } from "../location/Location";

interface ShelterProps {
  name: string;
  location: Location;
  managingAgencyId: UniqueEntityID;
  capacity: number;
  currentOccupancy: number;
  isOpen: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Shelter extends AggregateRoot<ShelterProps> {
  private constructor(
    props: ShelterProps,
    id?: UniqueEntityID
  ) {
    super(props, id);
  }

  public static create(
    props: ShelterProps,
    id?: UniqueEntityID
  ): Result<Shelter> {
    const validation = Result.combine([
      Guard.againstEmptyString(props.name, "name"),
      Guard.againstNullOrUndefined(props.location, "location"),
      Guard.againstNullOrUndefined(
        props.managingAgencyId,
        "managingAgencyId"
      ),
      Guard.isNonNegative(props.capacity, "capacity"),
      Guard.isNonNegative(
        props.currentOccupancy,
        "currentOccupancy"
      ),
    ]);

    if (validation.isFailure) {
      return Result.fail<Shelter>(validation.error!);
    }

    if (props.currentOccupancy > props.capacity) {
      return Result.fail<Shelter>(
        "Current occupancy cannot exceed shelter capacity."
      );
    }

    return Result.ok(new Shelter(props, id));
  }

  public get name(): string {
    return this.props.name;
  }

  public get location(): Location {
    return this.props.location;
  }

  public get managingAgencyId(): UniqueEntityID {
    return this.props.managingAgencyId;
  }

  public get capacity(): number {
    return this.props.capacity;
  }

  public get currentOccupancy(): number {
    return this.props.currentOccupancy;
  }

  public get isOpen(): boolean {
    return this.props.isOpen;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public open(): Result<void> {
    if (this.props.isOpen) {
      return Result.ok();
    }

    this.props.isOpen = true;
    this.touch();

    return Result.ok();
  }

  public close(): Result<void> {
    if (!this.props.isOpen) {
      return Result.ok();
    }

    this.props.isOpen = false;
    this.touch();

    return Result.ok();
  }

  public admitPeople(count: number): Result<void> {
    const validation = Guard.isPositive(count, "count");

    if (validation.isFailure) {
      return validation;
    }

    if (
      this.props.currentOccupancy + count >
      this.props.capacity
    ) {
      return Result.fail<void>(
        "Shelter capacity exceeded."
      );
    }

    this.props.currentOccupancy += count;
    this.touch();

    return Result.ok();
  }

  public releasePeople(count: number): Result<void> {
    const validation = Guard.isPositive(count, "count");

    if (validation.isFailure) {
      return validation;
    }

    if (count > this.props.currentOccupancy) {
      return Result.fail<void>(
        "Cannot release more occupants than currently present."
      );
    }

    this.props.currentOccupancy -= count;
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

  private touch(): void {
    this.props.updatedAt = new Date();
  }
}