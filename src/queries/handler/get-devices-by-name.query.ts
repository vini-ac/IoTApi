import { DeviceRepository } from '../../repositories/devices.repository';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetDevicesByNameQuery } from '../impl/get-devices-by-name.query';

@QueryHandler(GetDevicesByNameQuery)
export class GetDevicesByNameHandler implements IQueryHandler<GetDevicesByNameQuery> {

    constructor(private readonly repository: DeviceRepository) { }

    async execute(query: GetDevicesByNameQuery) {

        const {name} = query;

        return await this.repository.getDeviceByName(name);
    }
}