import { IEvent } from "@nestjs/cqrs";
import { EntityId } from "../cqrs/seed-work/entity.cqrs";
import { User } from "../core/user.core";

export abstract class Event implements IEvent{

    public readonly id: EntityId;    
    public readonly createdOn: Date;

    protected constructor(
        public readonly name: string,
        public readonly aggregateName: string,
        public readonly version?: string,
        public readonly createdBy?: User,
    ){
        this.id = new EntityId();
        this.createdOn = new Date();
    }
}