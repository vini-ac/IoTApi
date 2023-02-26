import { EntityId } from '@app/bcl/cqrs';
import { IQuery } from '@nestjs/cqrs';

export class GetDeviceByIdQuery implements IQuery{
    
    constructor(public readonly id: EntityId){}
}