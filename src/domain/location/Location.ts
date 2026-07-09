import { ValueObject } from "../shared/base/ValueObject";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

interface LocationProps {
  latitude: number;
  longitude: number;
  altitude?: number;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export class Location extends ValueObject<LocationProps> {
  private constructor(props: LocationProps) {
    super(props);
  }

  public static create(props: LocationProps): Result<Location> {
    const validation = Result.combine([
      Guard.inRange(props.latitude, -90, 90, "latitude"),
      Guard.inRange(props.longitude, -180, 180, "longitude"),
    ]);

    if (validation.isFailure) {
      return Result.fail<Location>(validation.error!);
    }

    return Result.ok(new Location(props));
  }

  public get latitude(): number {
    return this.props.latitude;
  }

  public get longitude(): number {
    return this.props.longitude;
  }

  public get altitude(): number | undefined {
    return this.props.altitude;
  }

  public get address(): string | undefined {
    return this.props.address;
  }

  public get city(): string | undefined {
    return this.props.city;
  }

  public get state(): string | undefined {
    return this.props.state;
  }

  public get country(): string | undefined {
    return this.props.country;
  }

  public get postalCode(): string | undefined {
    return this.props.postalCode;
  }

  public toGeoJSON() {
    return {
      type: "Point" as const,
      coordinates: [
        this.longitude,
        this.latitude,
        this.altitude ?? 0,
      ],
    };
  }

  /**
   * Calculates the distance (in kilometers) between this
   * location and another using the Haversine formula.
   */
  public distanceTo(other: Location): number {
    const earthRadius = 6371;

    const toRadians = (degrees: number): number =>
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

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  }

  public toString(): string {
    return `${this.latitude}, ${this.longitude}`;
  }
}