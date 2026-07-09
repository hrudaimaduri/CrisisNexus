import { ValueObject } from "../shared/base/ValueObject";
import { Result } from "../shared/result/Result";
import { Guard } from "../shared/guards/Guard";

import { Coordinates } from "./Coordinates";
import { Address } from "./Address";

interface LocationProps {
  coordinates: Coordinates;
  address?: Address;
}

export class Location extends ValueObject<LocationProps> {
  private constructor(props: LocationProps) {
    super(props);
  }

  public static create(
    props: LocationProps
  ): Result<Location> {
    const validation = Guard.againstNullOrUndefined(
      props.coordinates,
      "coordinates"
    );

    if (validation.isFailure) {
      return Result.fail<Location>(validation.error!);
    }

    return Result.ok(new Location(props));
  }

  public get coordinates(): Coordinates {
    return this.props.coordinates;
  }

  public get address(): Address | undefined {
    return this.props.address;
  }

  public get latitude(): number {
    return this.coordinates.latitude;
  }

  public get longitude(): number {
    return this.coordinates.longitude;
  }

  public toGeoJSON() {
    return {
      type: "Point" as const,
      coordinates: [
        this.longitude,
        this.latitude
      ]
    };
  }

  public distanceTo(other: Location): number {
    const earthRadius = 6371;

    const toRadians = (degrees: number) =>
      (degrees * Math.PI) / 180;

    const dLat = toRadians(
      other.latitude - this.latitude
    );

    const dLon = toRadians(
      other.longitude - this.longitude
    );

    const lat1 = toRadians(this.latitude);
    const lat2 = toRadians(other.latitude);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(lat1) *
      Math.cos(lat2) *
      Math.sin(dLon / 2) ** 2;

    const c =
      2 *
      Math.atan2(
        Math.sqrt(a),
        Math.sqrt(1 - a)
      );

    return earthRadius * c;
  }

  public toString(): string {
    return `${this.latitude}, ${this.longitude}`;
  }
}