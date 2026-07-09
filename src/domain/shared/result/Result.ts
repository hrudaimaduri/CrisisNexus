export class Result<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error?: string;
  private readonly value?: T;

  private constructor(
    isSuccess: boolean,
    error?: string,
    value?: T
  ) {
    if (isSuccess && error) {
      throw new Error(
        "A successful result cannot contain an error."
      );
    }

    if (!isSuccess && !error) {
      throw new Error(
        "A failed result must contain an error message."
      );
    }

    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  /**
   * Returns the encapsulated value.
   * Throws only if accessed on a failed Result,
   * indicating a programming error rather than
   * a domain validation failure.
   */
  public getValue(): T {
    if (this.isFailure) {
      throw new Error(
        `Cannot retrieve the value from a failed result. Error: ${this.error}`
      );
    }

    return this.value as T;
  }

  /**
   * Creates a successful Result.
   */
  public static ok<U>(value?: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  /**
   * Creates a failed Result.
   */
  public static fail<U>(error: string): Result<U> {
    return new Result<U>(false, error);
  }

  /**
   * Combines multiple Results.
   * Returns the first failure encountered,
   * otherwise returns a successful Result.
   */
  public static combine(
    results: Result<unknown>[]
  ): Result<void> {
    for (const result of results) {
      if (result.isFailure) {
        return Result.fail<void>(result.error!);
      }
    }

    return Result.ok<void>();
  }
}