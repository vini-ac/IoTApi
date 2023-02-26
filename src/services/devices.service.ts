import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { User } from '../../libs/bcl/src/core/core';
import { CreateDeviceCommand } from '../commands/impl/create-device.command';
import { GetAllDevicesQuery } from '../queries/impl/get-all-devices.query'
import { GetDevicesByNameQuery } from '../queries/impl/get-devices-by-name.query';
import { DeviceDto } from '../dtos/devices.dto'
import { Device } from '../model/devices.model'
import { QueryBus } from '@nestjs/cqrs';
import { EntityId } from '@app/bcl/cqrs';
import { GetDeviceByIdQuery } from '../queries/impl/get-devices-by-id.query';
import { DeleteDeviceCommand } from 'src/commands/impl/delete-device.command';
import { UpdateDeviceCommand } from 'src/commands/impl/update-device.command';
import { MyGateway } from 'src/gateway/gateway';


@Injectable()
export class DeviceService {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    private readonly gateway: MyGateway
    ){}

  async getDevicesList(user: User): Promise<DeviceDto[]> {
    const device: Device[] = await this.queryBus.execute(new GetAllDevicesQuery());
    return device ? DeviceDto.convertAll(device) : [];
  }

  async createDevice(device: DeviceDto, user: User): Promise<DeviceDto> {
    const deviceDto: Device = await this.commandBus.execute(new CreateDeviceCommand(device, user));
    return deviceDto ? DeviceDto.convert(deviceDto) : null;
  }

  async getDeviceById(id: EntityId): Promise<DeviceDto> {
    const deviceDto: Device = await this.queryBus.execute(new GetDeviceByIdQuery(id));
    return deviceDto ? DeviceDto.convert(deviceDto) : null;
  }

  async getDeviceByName(name: string): Promise<DeviceDto> {
    const device: Device = await this.queryBus.execute(new GetDevicesByNameQuery(name));
    return device ? DeviceDto.convert(device) : null;
  }

  async deleteDevice(id: EntityId, user: User) {
    return await this.commandBus.execute(new DeleteDeviceCommand(id, user));
  }

  async updateDevice(id: EntityId, device: DeviceDto, user: User): Promise<DeviceDto> {
    const deviceDto: Device = await this.commandBus.execute(new UpdateDeviceCommand(id, device, user));
    const result =  deviceDto ? DeviceDto.convert(deviceDto) : null;

    this.gateway.onPutDevice(result);

    return result;
  }
}
