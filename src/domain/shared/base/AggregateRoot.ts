import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityID";
import { DomainEvent } from "../events/DomainEvent";

export abstract class AggregateRoot<T> extends Entity<T> {
  private readonly domainEvents: DomainEvent[] = [];

  protected constructor(props: T, id?: UniqueEntityID) {
    super(props, id);
  }

  /**
   * Registers a new domain event.
   */
  protected addDomainEvent(event: DomainEvent): void {
    this.domainEvents.push(event);
  }

  /**
   * Removes all registered domain events.
   */
  public clearEvents(): void {
    this.domainEvents.length = 0;
  }

  /**
   * Returns a read-only copy of the registered domain events.
   */
  public get events(): readonly DomainEvent[] {
    return [...this.domainEvents];
  }
}