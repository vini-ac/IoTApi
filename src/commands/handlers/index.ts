import { CreateDeviceCommandHandler } from './create-device.handler';
import { DeleteDeviceCommandHandler } from './delete-device.handler';
import { UpdateDeviceCommandHandler } from './update-device.handler';


export const CommandHandlers = [CreateDeviceCommandHandler, DeleteDeviceCommandHandler, UpdateDeviceCommandHandler];
