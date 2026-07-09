export class ApplicationResult<T> {
  public readonly isSuccess: boolean;
  public readonly isFailure: boolean;
  public readonly error?: string;
  private readonly value?: T;

  private constructor(
    isSuccess: boolean,
    error?: string,
    value?: T
  ) {
    this.isSuccess = isSuccess;
    this.isFailure = !isSuccess;
    this.error = error;
    this.value = value;

    Object.freeze(this);
  }

  public getValue(): T {
    if (this.isFailure) {
      throw new Error(
        "Cannot retrieve the value of a failed application result."
      );
    }

    return this.value as T;
  }

  public static ok<U>(value?: U): ApplicationResult<U> {
    return new ApplicationResult<U>(
      true,
      undefined,
      value
    );
  }

  public static fail<U>(
    error: string
  ): ApplicationResult<U> {
    return new ApplicationResult<U>(
      false,
      error
    );
  }
}