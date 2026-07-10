import { IUseCase } from "../../common/IUseCase";
import { ApplicationResult } from "../../common/ApplicationResult";

import { AgencyListResponse } from "../dto/AgencyListResponse";

export class GetAgenciesUseCase
  implements IUseCase<void, ApplicationResult<AgencyListResponse>> {

  async execute(): Promise<ApplicationResult<AgencyListResponse>> {

    throw new Error("Not implemented.");

  }

}
