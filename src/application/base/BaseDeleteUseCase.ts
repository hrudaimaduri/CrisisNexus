import { ApplicationResult } from "../common/ApplicationResult";
import { IUseCase } from "../common/IUseCase";;

export abstract class BaseDeleteUseCase<TCommand>
  implements
    IUseCase<
      TCommand,
      ApplicationResult<void>
    > {

  abstract execute(
    command: TCommand
  ): Promise<ApplicationResult<void>>;

}