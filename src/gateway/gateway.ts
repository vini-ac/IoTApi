import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { OnModuleInit } from '@nestjs/common'
import { Server } from 'socket.io'
import { DeviceDto } from 'src/dtos/devices.dto';

@WebSocketGateway(3001)
export class MyGateway implements OnModuleInit {
    @WebSocketServer()
    server: Server;

    onModuleInit(){
        this.server.on('connection', (socket) => {
            console.log(socket.id)
        });
    }

    @SubscribeMessage('newMessage')
    onNewMessage(@MessageBody() body: any){
        this.server.emit('onMessage', {
            msg:"New Message",
            content: body
        });
    }

    onPutDevice(@MessageBody() body: DeviceDto) {
        if(!body)
            this.server.emit('updateDevice', {message: "Something went wrong."});
        else
            this.server.emit('updateDevice', body);
    }
}