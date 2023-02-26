import { EntityId } from '@app/bcl/cqrs';
import { ICommand } from '@nestjs/cqrs';
import { User } from '../../../libs/bcl/src/core/core';

export class DeleteDeviceCommand implements ICommand {
    
    constructor( 
        public readonly id: EntityId,
        public readonly user: User ){}
}