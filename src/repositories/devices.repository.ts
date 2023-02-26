import { Device } from '../model/devices.model';
import { Injectable } from "@nestjs/common";
const MongoClient = require('mongodb').MongoClient;
import { config } from '../../config';
import { EntityId } from '@app/bcl/cqrs';

@Injectable()
export class DeviceRepository {

    private readonly client;
    private readonly db;
    private readonly collection;

    constructor() {
        this.client = new MongoClient(config.DEVICES_APP.mongodb, {useNewUrlParser: true});
        this.db = this.client.db(config.DEVICES_APP.database);
        this.collection = this.db.collection(config.DEVICES_APP.collection);
    }

    async getAllDevices(): Promise<Device[]>{
        let deviceList = []

        const queryOutput = await this.collection.find({}).toArray(function(err, result) {
            if (err) throw err;
            this.db.close();
        })

        if(queryOutput.length > 0) {      
            queryOutput.forEach(function(item){
                deviceList.push(Device.createDeviceFrom(item.id, item.props, item.track, item.state, item.object_key));
            });
            return deviceList;
        }

        return null;
    }

    async getDeviceById(id: EntityId): Promise<Device>{
        const queryOutput = await this.collection.find({object_key: id.value}).toArray(function(err, result) {
            if (err) throw err;
            this.db.close();
        })

        if(queryOutput.length > 0) {      
            const item = queryOutput[0];
            return Device.createDeviceFrom(item.id, item.props, item.track, item.state, item.object_key);
        }

        return null;
    }

    async getDeviceByName(name: string): Promise<Device>{
        const queryOutput = await this.collection.find({"props.name": name}).toArray(function(err, result) {
            if (err) throw err;
            this.db.close();
        })

        if(queryOutput.length > 0) {      
            const item = queryOutput[0];
            return Device.createDeviceFrom(item.id, item.props, item.track, item.state, item.object_key);
        }

        return null;
    }

    async save(device: Device) {
        this.collection.insertOne(device, function(err, res) {
            if (err) throw err;
            this.db.close();
          });
    }

    async update(id: EntityId, device: Device){
        this.collection.replaceOne({object_key: id.value}, device, function(err, res) {
            if (err) throw err;
            this.db.close();
        });
    }

    async deleteById(id: EntityId){
        this.collection.deleteOne({object_key: id.value}, function(err, obj) {
            if (err) throw err;
            this.db.close();
          });
    }
    
}
