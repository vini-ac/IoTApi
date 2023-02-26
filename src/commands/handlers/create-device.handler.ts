import { CreateDeviceCommand } from '../impl/create-device.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Device } from '../../model/devices.model'
import { DeviceRepository } from '../../repositories/devices.repository';

@CommandHandler(CreateDeviceCommand)
export class CreateDeviceCommandHandler

implements ICommandHandler<CreateDeviceCommand> {

    constructor(
        private readonly deviceRepository: DeviceRepository
        ){}
    
    async execute(command: CreateDeviceCommand){

        const {device, user} = command;

        let deviceEntity = Device.createDevice(device, user);

        if(!deviceEntity.brightness.includes('%'))
            deviceEntity.brightness = device.brightness.concat('%')

        if(!deviceEntity.temperature.includes('°'))
            deviceEntity.temperature = deviceEntity.temperature.concat('°')

        if(!deviceEntity.moisture.includes('%'))
            deviceEntity.moisture = deviceEntity.moisture.concat('%')

        await this.deviceRepository.save(deviceEntity);

        return deviceEntity;
    }
}