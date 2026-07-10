import { ApplicationResult } from "../common/ApplicationResult";
import { IUseCase } from "../common/IUseCase";

export abstract class BaseGetAllUseCase<TResponse>
  implements
    IUseCase<
      void,
      ApplicationResult<TResponse[]>
    > {

  abstract execute():
    Promise<ApplicationResult<TResponse[]>>;

}