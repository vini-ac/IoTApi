import { Module } from '@nestjs/common';
import { BclModule } from '../libs/bcl';
import { Services } from './services';
import { Repositories } from './repositories';
import { CommandHandlers } from './commands/handlers';
import { QueriesHandlers } from './queries/handler'
import { DeviceController } from './controllers/devices.controller';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MulterModule } from '@nestjs/platform-express';
import { GatewayModule } from './gateway/gateway.module';
import { Gateway } from './gateway'

@Module({
  imports: [CqrsModule,
    MulterModule.register({storage: require('multer').memoryStorage() }), 
    BclModule,
    GatewayModule,
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://broker.emqx.io:1883',
        }
      },
  ])],
  controllers: [DeviceController],
  providers: [
    ...Repositories,
    ...CommandHandlers,
    ...QueriesHandlers,
    ...Services,
    ...Gateway
  ],
})
export class AppModule {}
