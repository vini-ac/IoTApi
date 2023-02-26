import { UpdateDeviceCommand } from '../impl/update-device.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { Device } from '../../model/devices.model'
import { DeviceRepository } from '../../repositories/devices.repository';

@CommandHandler(UpdateDeviceCommand)
export class UpdateDeviceCommandHandler

implements ICommandHandler<UpdateDeviceCommand> {

    constructor(
        private readonly deviceRepository: DeviceRepository
        ){}
    
    async execute(command: UpdateDeviceCommand){

        const {id, device, user} = command;

        const deviceEntity = await this.deviceRepository.getDeviceById(id);

        if(deviceEntity){
            let updatedDeviceEntity = Device.createDevice(device, user, id);

            if(!device.brightness)
                updatedDeviceEntity.brightness = deviceEntity.brightness;
            if(!device.moisture)
                updatedDeviceEntity.moisture = deviceEntity.moisture;
            if(!device.temperature)
                updatedDeviceEntity.temperature = deviceEntity.temperature;
            if(!device.name)
                updatedDeviceEntity.name = deviceEntity.name;
            if(!device.isOn)
                updatedDeviceEntity.isOn = deviceEntity.isOn;

            await this.deviceRepository.update(id, updatedDeviceEntity);

            return updatedDeviceEntity;
        }

        return null;
    }
}