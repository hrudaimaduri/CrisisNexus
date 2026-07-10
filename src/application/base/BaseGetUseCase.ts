import { ApplicationResult } from "../common/ApplicationResult";
import { IUseCase } from "../common/IUseCase";
export abstract class BaseGetUseCase<TResponse>
  implements
    IUseCase<
      string,
      ApplicationResult<TResponse>
    > {

  abstract execute(
    id: string
  ): Promise<ApplicationResult<TResponse>>;

}