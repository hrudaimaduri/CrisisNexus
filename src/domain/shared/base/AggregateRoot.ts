import { Entity } from "./Entity";
import { UniqueEntityID } from "./UniqueEntityID";

export abstract class AggregateRoot<T> extends Entity<T> {

    private domainEvents: unknown[] = [];

    protected constructor(props: T, id?: UniqueEntityID) {
        super(props, id);
    }

    public addDomainEvent(event: unknown): void {
        this.domainEvents.push(event);
    }

    public clearEvents(): void {
        this.domainEvents = [];
    }

    public get events(): readonly unknown[] {
        return this.domainEvents;
    }

}