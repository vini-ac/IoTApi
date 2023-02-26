import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import { config } from '../config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('IoT Device Managment API')
    .setDescription('Organizes information about IoT devices')
    .setVersion('1.0')
    .build();

  const storageDocument = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('', app, storageDocument);

  await app.listen(process.env.PORT || 5003);

  console.log(`API Devices running on: PORT ${process.env.PORT || 5003}`)

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
