import { Result } from "../../domain/shared/result/Result";
import { ApplicationResult } from "../common/ApplicationResult";
import { IUseCase } from "../common/IUseCase";

export interface BaseMapper<
  TCommand,
  TDomain,
  TResponse
> {

  toDomain(
    command: TCommand
  ): Result<TDomain>;

  toResponse(
    domain: TDomain
  ): TResponse;

}