import { Body, Controller, Get, HttpStatus, Post, Req, Res, Put, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { DeviceDto, DeviceForSwaggerDto, DeviceUpdateForSwaggerDto } from '../dtos/devices.dto';
import { DeviceService } from '../services/devices.service';
import { Response } from 'express';
import { EntityId } from '@app/bcl/cqrs';

@ApiTags('Devices')
@Controller()
export class DeviceController{
    constructor(private readonly deviceService: DeviceService){}
    
    @Get('devices')
    async getDeviceList(@Req() req, @Res() res: Response) {

        const devices = await this.deviceService.getDevicesList(req.user);

        return devices ? 
            res.status(HttpStatus.OK).send(devices) :
            res.status(HttpStatus.NO_CONTENT)
                .send({ statusCode: HttpStatus.NO_CONTENT, message: 'NoContent' })
    }

    @Get(':id')
    async getDevicesById(@Req() req, @Res() res: Response, @Param('id') id: string) {

        const device: DeviceDto = await this.deviceService.getDeviceById(new EntityId(id));

        return device ? 
            res.status(HttpStatus.OK).send(device) :
            res.status(HttpStatus.NO_CONTENT)
                .send({ statusCode: HttpStatus.NO_CONTENT, message: 'NoContent' })
    }

    @Get(':name/devices')
    async getDevicesByName(@Req() req, @Res() res: Response, @Param('name') name: string) {

        const device: DeviceDto = await this.deviceService.getDeviceByName(name);

        return device ? 
            res.status(HttpStatus.OK).send(device) :
            res.status(HttpStatus.NO_CONTENT)
                .send({ statusCode: HttpStatus.NO_CONTENT, message: 'NoContent' })
    }

    @Post('/devices')
    @ApiBody({ description: 'Device Payload', type: DeviceForSwaggerDto })
    async createDevice(@Req() req, @Res() res: Response, @Body() body: DeviceDto) {

        if (!body.name || !body.brightness || !body.moisture || !body.temperature)
            return res.status(HttpStatus.BAD_REQUEST)
                .send({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: "Required fields are missing."
                });

        const device: DeviceDto = await this.deviceService.createDevice(body, {id: '012391', name:'Vinicius'});

        if(device)
            return res.status(HttpStatus.OK).send({id: device.key});

        return res.status(HttpStatus.OK).send({id: device.key});

    }

    @Put('/devices')
    @ApiBody({description: 'Device Payload', type: DeviceUpdateForSwaggerDto})
    async updateDevice(@Req() req, @Res() res: Response, @Body() body: DeviceDto ){

        const device: DeviceDto = await this.deviceService.updateDevice(new EntityId(body.key), body, {id: '012391', name:'Vinicius'});

        if(device)
            return res.status(HttpStatus.OK).send(device)
        else
            return res.status(HttpStatus.BAD_REQUEST).send({message: 'ERROR'})

            

    }

    @Delete(':id')
    async deleteDeviceById(@Req() req, @Res() res: Response, @Param('id') id: string) {

        const device: DeviceDto = await this.deviceService.deleteDevice(new EntityId(id), {id: '012391', name:'Vinicius'});

        if (!device)
            return res.status(HttpStatus.NOT_FOUND).send('NotFound');

        return res.status(HttpStatus.OK).send(device);
    }
}