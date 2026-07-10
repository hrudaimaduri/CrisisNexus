import { IUseCase } from "../../common/IUseCase";
import { ApplicationResult } from "../../common/ApplicationResult";

import { DeleteAgencyCommand } from "../commands/DeleteAgencyCommand";

export class DeleteAgencyUseCase
  implements IUseCase<DeleteAgencyCommand, ApplicationResult<void>> {

  async execute(
    command: DeleteAgencyCommand
  ): Promise<ApplicationResult<void>> {

    throw new Error("Not implemented.");

  }

}