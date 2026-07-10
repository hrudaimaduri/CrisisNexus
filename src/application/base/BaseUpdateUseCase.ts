import { ApplicationResult } from "../common/ApplicationResult";
import { IUseCase } from "../common/IUseCase";;

export abstract class BaseUpdateUseCase<
  TCommand,
  TResponse
> implements
    IUseCase<
      TCommand,
      ApplicationResult<TResponse>
    > {

  abstract execute(
    command: TCommand
  ): Promise<ApplicationResult<TResponse>>;

}