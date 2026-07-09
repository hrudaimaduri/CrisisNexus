import { Result } from "../result/Result";

export interface GuardArgument {
  argument: unknown;
  argumentName: string;
}

export class Guard {
  /**
   * Checks whether a value is null or undefined.
   */
  public static againstNullOrUndefined(
    argument: unknown,
    argumentName: string
  ): Result<void> {
    if (argument === null || argument === undefined) {
      return Result.fail<void>(
        `${argumentName} cannot be null or undefined.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks multiple values for null or undefined.
   */
  public static againstNullOrUndefinedBulk(
    args: GuardArgument[]
  ): Result<void> {
    for (const arg of args) {
      const result = this.againstNullOrUndefined(
        arg.argument,
        arg.argumentName
      );

      if (result.isFailure) {
        return result;
      }
    }

    return Result.ok<void>();
  }

  /**
   * Checks whether a string is empty or whitespace.
   */
  public static againstEmptyString(
    value: string,
    argumentName: string
  ): Result<void> {
    const nullCheck = this.againstNullOrUndefined(
      value,
      argumentName
    );

    if (nullCheck.isFailure) {
      return nullCheck;
    }

    if (value.trim().length === 0) {
      return Result.fail<void>(
        `${argumentName} cannot be empty.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks that a string length falls within a range.
   */
  public static inRange(
    value: number,
    min: number,
    max: number,
    argumentName: string
  ): Result<void> {
    if (value < min || value > max) {
      return Result.fail<void>(
        `${argumentName} must be between ${min} and ${max}.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks minimum string length.
   */
  public static minLength(
    value: string,
    min: number,
    argumentName: string
  ): Result<void> {
    if (value.length < min) {
      return Result.fail<void>(
        `${argumentName} must contain at least ${min} characters.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks maximum string length.
   */
  public static maxLength(
    value: string,
    max: number,
    argumentName: string
  ): Result<void> {
    if (value.length > max) {
      return Result.fail<void>(
        `${argumentName} must not exceed ${max} characters.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks whether an array is empty.
   */
  public static againstEmptyArray<T>(
    array: T[],
    argumentName: string
  ): Result<void> {
    const nullCheck = this.againstNullOrUndefined(
      array,
      argumentName
    );

    if (nullCheck.isFailure) {
      return nullCheck;
    }

    if (array.length === 0) {
      return Result.fail<void>(
        `${argumentName} cannot be empty.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks whether a number is positive.
   */
  public static isPositive(
    value: number,
    argumentName: string
  ): Result<void> {
    if (value <= 0) {
      return Result.fail<void>(
        `${argumentName} must be greater than zero.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks whether a number is non-negative.
   */
  public static isNonNegative(
    value: number,
    argumentName: string
  ): Result<void> {
    if (value < 0) {
      return Result.fail<void>(
        `${argumentName} cannot be negative.`
      );
    }

    return Result.ok<void>();
  }

  /**
   * Checks whether a string matches a regular expression.
   */
  public static matches(
    value: string,
    pattern: RegExp,
    argumentName: string
  ): Result<void> {
    if (!pattern.test(value)) {
      return Result.fail<void>(
        `${argumentName} has an invalid format.`
      );
    }

    return Result.ok<void>();
  }
}