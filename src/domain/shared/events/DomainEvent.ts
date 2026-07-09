import { UniqueEntityID } from "../base/UniqueEntityID";

export interface DomainEvent {
  /**
   * Unique identifier of the aggregate that raised this event.
   */
  readonly aggregateId: UniqueEntityID;

  /**
   * Date and time when the event occurred.
   */
  readonly occurredOn: Date;

  /**
   * Name of the event.
   * Example: "DisasterReported"
   */
  readonly eventName: string;
}