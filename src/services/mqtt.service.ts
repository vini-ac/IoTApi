import { Injectable, OnModuleInit, Body } from "@nestjs/common";
import { config } from '../../config';
import { connect } from "mqtt";
import { DeviceService } from "./devices.service";
import { EntityId } from "@app/bcl/cqrs";
import { DeviceDto } from "src/dtos/devices.dto";

@Injectable()
export class MqttService implements OnModuleInit {
  private mqttClient;
  constructor(
    private readonly deviceService: DeviceService,
    ){}

    onModuleInit() {
        const host = config.MQTT_APP.host
        const port = config.MQTT_APP.port
        const clientId = `mqtt_${Math.random().toString(16).slice(3)}`;
        const connectUrl = `mqtt://${host}:${port}`;
        const topic = "iotTestTopic";

        this.mqttClient = connect(connectUrl, {
        clientId,
        clean: true,
        connectTimeout: 4000,
        username: config.MQTT_APP.user,
        password: config.MQTT_APP.password,
        reconnectPeriod: 1000,
        });

        this.mqttClient.on("connect", function () {
        console.log("Connected to CloudMQTT");
        });

        this.mqttClient.on("error", function () {
        console.log("Error in connecting to CloudMQTT");
        });

        this.mqttClient.subscribe(topic, 0, function(qos) {});

        this.mqttClient.on('message', (topic, message) => {
            const data:DeviceDto = JSON.parse(message)
            this.deviceService.updateDevice(new EntityId(data.key), data, {id: '012391', name:'Vinicius'})
        });
    }

    read(topic: string) {
        console.log(`reading from topic: ${topic}`);
        this.mqttClient.subscribe(topic, 0, function(qos) {
            console.log("Subscribed QoS = " + qos);
        });

        this.mqttClient.on('message', (topic, message: DeviceDto) => {
            const data:DeviceDto = JSON.parse(message.toString())
            this.deviceService.updateDevice(new EntityId(data.key), data, {id: '012391', name:'Vinicius'})
        });
    }
}