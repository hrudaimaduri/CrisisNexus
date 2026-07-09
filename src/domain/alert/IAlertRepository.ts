import { IRepository } from "../shared/repository/IRepository";
import { Alert } from "./Alert";

export interface IAlertRepository
  extends IRepository<Alert> {

  findActiveAlerts(): Promise<Alert[]>;
}