import { ValueObject } from "../shared/base/ValueObject";
import { Guard } from "../shared/guards/Guard";
import { Result } from "../shared/result/Result";

interface AddressProps {
  addressLine?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
}

export class Address extends ValueObject<AddressProps> {
  private constructor(props: AddressProps) {
    super(props);
  }

  public static create(
    props: AddressProps
  ): Result<Address> {

    if (props.postalCode) {
      const result = Guard.maxLength(
        props.postalCode,
        20,
        "postalCode"
      );

      if (result.isFailure) {
        return Result.fail(result.error!);
      }
    }

    return Result.ok(new Address(props));
  }

  public get addressLine(): string | undefined {
    return this.props.addressLine;
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
}