import { agencyRepository } from "../../infrastructure/container/repositories";

import { CreateAgencyUseCase } from "./usecases/CreateAgencyUseCase";
import { UpdateAgencyUseCase } from "./usecases/UpdateAgencyUseCase";
import { DeleteAgencyUseCase } from "./usecases/DeleteAgencyUseCase";
import { GetAgencyUseCase } from "./usecases/GetAgencyUseCase";
import { GetAgenciesUseCase } from "./usecases/GetAgenciesUseCase";

export const agencyModule = {

  createAgency:
    new CreateAgencyUseCase(),

  updateAgency:
    new UpdateAgencyUseCase(
      
    ),

  deleteAgency:
    new DeleteAgencyUseCase(
      
    ),

  getAgency:
    new GetAgencyUseCase(
      
    ),

  getAgencies:
    new GetAgenciesUseCase(
      
    )

};