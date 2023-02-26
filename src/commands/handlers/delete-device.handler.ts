import { DeleteDeviceCommand } from '../impl/delete-device.command';
import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { DeviceRepository } from '../../repositories/devices.repository';

@CommandHandler(DeleteDeviceCommand)
export class DeleteDeviceCommandHandler

implements ICommandHandler<DeleteDeviceCommand> {

    constructor(
        private readonly deviceRepository: DeviceRepository){}
    
    async execute(command: DeleteDeviceCommand){

        const {id} = command;

        const deviceEntity = await this.deviceRepository.getDeviceById(id);

        if(deviceEntity)
        {
            await this.deviceRepository.deleteById(id);
            return id;
        }
        
        return null;
    }
}