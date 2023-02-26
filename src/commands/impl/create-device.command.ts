import { DeviceDto } from '../../dtos/devices.dto';
import { ICommand } from '@nestjs/cqrs';
import { User } from '../../../libs/bcl/src/core/core';

export class CreateDeviceCommand implements ICommand {
    
    constructor( 
        public readonly device: DeviceDto,
        public readonly user: User ){}
}