import { IUseCase } from "../../common/IUseCase";
import { ApplicationResult } from "../../common/ApplicationResult";

import { CreateAgencyCommand } from "../commands/CreateAgencyCommand";
import { AgencyResponse } from "../dto/AgencyResponse";

export class CreateAgencyUseCase
  implements IUseCase<CreateAgencyCommand, ApplicationResult<AgencyResponse>> {

  async execute(
    command: CreateAgencyCommand
  ): Promise<ApplicationResult<AgencyResponse>> {

    throw new Error("Not implemented.");

  }

}