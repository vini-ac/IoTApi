import { DeviceRepository } from '../../repositories/devices.repository';
import { GetAllDevicesQuery } from '../impl/get-all-devices.query';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetAllDevicesQuery)
export class GetAllDevicesHandler implements IQueryHandler<GetAllDevicesQuery> {

    constructor(private readonly repository: DeviceRepository) { }

    async execute(query: GetAllDevicesQuery) {

        return await this.repository.getAllDevices();
    }
}