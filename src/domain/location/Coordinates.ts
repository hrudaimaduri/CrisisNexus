import { ValueObject } from "../shared/base/ValueObject";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

interface CoordinatesProps {
  latitude: number;
  longitude: number;
}

export class Coordinates extends ValueObject<CoordinatesProps> {
  private constructor(props: CoordinatesProps) {
    super(props);
  }

  public static create(
    props: CoordinatesProps
  ): Result<Coordinates> {
    const validation = Result.combine([
      Guard.inRange(props.latitude, -90, 90, "latitude"),
      Guard.inRange(props.longitude, -180, 180, "longitude"),
    ]);

    if (validation.isFailure) {
      return Result.fail(validation.error!);
    }

    return Result.ok(new Coordinates(props));
  }

  public get latitude(): number {
    return this.props.latitude;
  }

  public get longitude(): number {
    return this.props.longitude;
  }

  public toString(): string {
    return `${this.latitude}, ${this.longitude}`;
  }
}