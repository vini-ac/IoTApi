import { DeviceDto } from '../../dtos/devices.dto';
import { ICommand } from '@nestjs/cqrs';
import { EntityId } from '@app/bcl/cqrs';
import { User } from '@app/bcl/core/user.core';

export class UpdateDeviceCommand implements ICommand {
    
    constructor( 
        public readonly id: EntityId,
        public readonly device: DeviceDto,
        public readonly user: User ){}
}