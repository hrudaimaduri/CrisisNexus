import { Result } from "../../domain/shared/result/Result";

export interface IValidator<T> {

  validate(
    value: T
  ): Result<void>;

}