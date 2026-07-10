import { IUseCase } from "../../common/IUseCase";
import { ApplicationResult } from "../../common/ApplicationResult";

import { AgencyResponse } from "../dto/AgencyResponse";

export class GetAgencyUseCase
  implements IUseCase<string, ApplicationResult<AgencyResponse>> {

  async execute(
    id: string
  ): Promise<ApplicationResult<AgencyResponse>> {

    throw new Error("Not implemented.");

  }

}