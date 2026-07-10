import { Address } from "../../../../domain/location/Address";
import { Coordinates } from "../../../../domain/location/Coordinates";
import { Location } from "../../../../domain/location/Location";

import { Result } from "../../../../domain/shared/result/Result";

import { AgencyRecord } from "../types/PrismaPayloads";

type LocationRecord = NonNullable<AgencyRecord["location"]>;

export class BaseLocationMapper {

  public static toDomain(
    record: LocationRecord
  ): Result<Location> {

    const coordinatesResult = Coordinates.create({
      latitude: record.coordinates.latitude,
      longitude: record.coordinates.longitude
    });

    if (coordinatesResult.isFailure) {
      return Result.fail<Location>(
        coordinatesResult.error!
      );
    }

    const addressResult = Address.create({
      addressLine: record.address ?? undefined,
      city: record.city ?? undefined,
      state: record.state ?? undefined,
      country: record.country ?? undefined,
      postalCode: record.postalCode ?? undefined
    });

    if (addressResult.isFailure) {
      return Result.fail<Location>(
        addressResult.error!
      );
    }

    return Location.create({
      coordinates: coordinatesResult.getValue(),
      address: addressResult.getValue()
    });

  }

}