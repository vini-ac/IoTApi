import { DeviceRepository } from '../../repositories/devices.repository';
import { GetDeviceByIdQuery } from '../impl/get-devices-by-id.query';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";

@QueryHandler(GetDeviceByIdQuery)
export class GetDeviceByIdHandler implements IQueryHandler<GetDeviceByIdQuery> {

    constructor(private readonly repository: DeviceRepository) { }

    async execute(query: GetDeviceByIdQuery) {

        const { id } = query

        return await this.repository.getDeviceById(id);
    }
}