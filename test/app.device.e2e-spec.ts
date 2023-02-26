import { DeviceController } from 'src/controllers/devices.controller';
import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { v4 as uuidv4 } from 'uuid';

describe('DeviceController', () => {
  let deviceController: DeviceController;
  let app: INestApplication;
  let deviceId: string;

  describe('UsersController', () => {
    let controller: DeviceController
  })

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should be defined', () => {
    expect(deviceController).toBeDefined();
  });

  it('/devices/:id (GET), Try to find a non-existing id, receive a not found response.', () => {
    return request(app.getHttpServer())
      .get(`/devices/${uuidv4()}`)
      .expect(204);
  });

  it('/devices (POST), Add a new device, receive a success response (200)', async () => {

    const response =
      await request(app.getHttpServer())
        .post('/device')
        .send({
          name: 'Geladeira',
          temperature: '2°',
          moisture: '50%',
          brightness: '30%',
          isOn: true
        })
        .expect(200);

    deviceId = response.body.id;
    return
  });

  it('/devices/:id (GET), Try to find a existing id, receive a success response.', () => {
    return request(app.getHttpServer())
      .get(`/devices/${deviceId}`)
      .expect(200);
  });

  it('/devices (POST), Try to add a new device with invalid payload, receive a bad request response (400)', async () => {

    const response =
      await request(app.getHttpServer())
        .post('/device')
        .send({"teste": "teste"})
        .expect(400);
    return
  });

  it('/devices/:id (GET), Try to get the list of devices, receive a sucess response.', () => {
    return request(app.getHttpServer())
      .get(`/devices`)
      .expect(200);
  });

  it('/devices (PUT), Update a device, receive a success response (200)', async () => {

    const response =
      await request(app.getHttpServer())
        .put('/devices')
        .send({
          name: 'Geladeira',
          temperature: '2°',
          moisture: '50%',
          brightness: '30%',
          isOn: true,
          key: "61a87ca1-96e5-4f7f-9b5c-19f170860081"
        })
        .expect(200);

    return
  });

  it('/devices (PUT), try to update a device, receive a bad request response (400)', async () => {

    const response =
      await request(app.getHttpServer())
        .put('/devices')
        .send({"teste": "teste"})
        .expect(400);

    return
  });

  it('/devices (DELETE), try to delete a device, receive a not found response (404)', async () => {

    const response =
      await request(app.getHttpServer())
        .delete(`/devices/${deviceId}`)
        .expect(404);

    return
  });

  it('/devices (DELETE), delete a device, receive a success response (200)', async () => {

    const response =
      await request(app.getHttpServer())
        .delete(`/devices/${deviceId}`)
        .expect(200);

    return
  });

  afterAll(async done => {
    await app.close();
    done();
  });
});