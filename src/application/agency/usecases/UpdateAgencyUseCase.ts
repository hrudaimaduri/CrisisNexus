import { IUseCase } from "../../common/IUseCase";
import { ApplicationResult } from "../../common/ApplicationResult";

import { UpdateAgencyCommand } from "../commands/UpdateAgencyCommand";
import { AgencyResponse } from "../dto/AgencyResponse";

export class UpdateAgencyUseCase
  implements IUseCase<UpdateAgencyCommand, ApplicationResult<AgencyResponse>> {

  async execute(
    command: UpdateAgencyCommand
  ): Promise<ApplicationResult<AgencyResponse>> {

    throw new Error("Not implemented.");

  }

}