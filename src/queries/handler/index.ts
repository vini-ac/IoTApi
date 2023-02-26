import { GetAllDevicesHandler } from './get-all-devices.query';
import { GetDevicesByNameHandler } from './get-devices-by-name.query';
import { GetDeviceByIdHandler } from './get-devices-by-id.query';



export const QueriesHandlers = [GetAllDevicesHandler, GetDevicesByNameHandler, GetDeviceByIdHandler];