import { BaseInMemoryRepository } from "./BaseInMemoryRepository";

import { Alert } from "../../../domain/alert/Alert";
import { IAlertRepository } from "../../../domain/alert/IAlertRepository";

export class InMemoryAlertRepository
  extends BaseInMemoryRepository<Alert>
  implements IAlertRepository {

  async findActiveAlerts(): Promise<Alert[]> {
    return this.getAll().filter(
      alert => alert.isActive
    );
  }

  async findByDisaster(
    disasterId: Alert["disasterId"]
  ): Promise<Alert[]> {

    return this.getAll().filter(
      alert =>
        alert.disasterId.equals(disasterId)
    );
  }
}