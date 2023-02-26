import { User } from '../../libs/bcl/src/core/core';
import { Entity, IState, ITrack, EntityId } from '../../libs/bcl/src/cqrs/seed-work/entity.cqrs';

interface IDevicesProps {
    name: string; 
    temperature: string;
    moisture: string;
    brightness: string;
    isOn: boolean;
}

export class Device extends Entity<IDevicesProps> {
    private constructor(
        props: IDevicesProps,
        id?: EntityId,
        object_key?: string){

        super(props, id, object_key);

    }
    [x: string]: any;

    get name(): string{
        return this.props.name;
    }

    get temperature(): string{
        return this.props.temperature;
    }

    get moisture(): string{
        return this.props.moisture;
    }

    get brightness(): string{
        return this.props.brightness;
    }

    get isOn(): boolean{
        return this.props.isOn;
    }

    set name(name: string){
        if(name)
            this.props.name = name;
    }

    set temperature(temperature: string){
        if(temperature)
            this.props.temperature = temperature;
    }

    set moisture(moisture: string){
        if(moisture)
            this.props.moisture = moisture;
    }

    set brightness(brightness: string){
        if(brightness)
            this.props.brightness = brightness;
    }

    set isOn(isOn: boolean){
        if(isOn)
            this.props.isOn = isOn;
    }

    static createDevice(props: IDevicesProps, owner: User, id?: EntityId){
        const newDevice = new Device(props, id ? id : new EntityId(), undefined);
        newDevice.trackBy(owner);
        
        return newDevice;
    }

    static createDeviceFrom(id: EntityId, props: IDevicesProps, audit: ITrack, state: IState, key?: string){  
        
        const newDevice = new Device(props, id, key);
        newDevice.setTrack(audit);
        newDevice.setState(state);

        return newDevice; 
    }
}