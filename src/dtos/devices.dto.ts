import { ApiProperty } from "@nestjs/swagger";
import { Device } from "../model/devices.model";

export class DeviceDto {
    public constructor(
        public readonly name: string,
        public readonly temperature: string,
        public readonly moisture: string,
        public readonly brightness: string,
        public readonly isOn:boolean,
        public readonly key: string,
        public readonly app: string ) { }

    static convert = (device: Device) => {
        return new DeviceDto(
            device.name,
            device.temperature,
            device.moisture,
            device.brightness,
            device.isOn,
            device.object_key,
            device.app
        )
    }

    static convertAll = (devices: Device[]): DeviceDto[] => {
        return devices ? devices.map(enterprise => DeviceDto.convert(enterprise)) : []
    }
}

export class DeviceForSwaggerDto {
    @ApiProperty({ type: 'string' })
    name: string
    @ApiProperty({ type: 'string' })
    temperature: string
    @ApiProperty({ type: 'string' })
    moisture: string
    @ApiProperty({ type: 'string' })
    brightness: string
    @ApiProperty()
    isOn: Boolean
}

export class DeviceUpdateForSwaggerDto extends DeviceForSwaggerDto {
    @ApiProperty({type: 'string'})
    key: string
}

export class AddUserSwaggerDto {
    @ApiProperty({ type: 'string' })
    id: string
    @ApiProperty({ type: 'string' })
    name: string
    @ApiProperty({ type: 'string' })
    email: string
}

export class AddUserToGroupSwaggerDto {
    @ApiProperty({ type: 'string' })
    id: string
    @ApiProperty({ type: 'string' })
    name: string
    @ApiProperty({ type: 'string' })
    email: string
    @ApiProperty()
    isAdmin: Boolean
}
