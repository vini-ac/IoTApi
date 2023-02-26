import { IQuery } from '@nestjs/cqrs';

export class GetDevicesByNameQuery implements IQuery{

    constructor(public readonly name: string){}
}