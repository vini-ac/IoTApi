import { User } from './../../core/user.core';
import { AggregateRoot } from '@nestjs/cqrs';
import { v4 as uuidv4 } from 'uuid';
import validator from 'validator';
import { config } from '../../../../../config';
import { Expose } from 'class-transformer';

export class EntityId {
    
    private _value: string;
    constructor(value?: string){

        if (value) 
            if (validator.isUUID(value))
                this._value = value;
            else
                throw Error('O ID informador é inválido.')
        else    
            this._value = uuidv4();
    }

    get value(): string{
        return this._value;
    }
}

export class Owner {
    constructor(public readonly user: User){}
}

export interface ITrack {
    owner: User;
    createdBy: User;
    modifiedBy: User;
    createdOn: Date;
    modifiedOn: Date;    
}

export interface IState {
    value: StateCode,
    isDeleted: boolean
}

export enum StateCode{
    Active =1,
    Inactive = 2
}

const isEntity = (v: any): v is Entity<any> => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return v instanceof Entity;
  };
  
export abstract class Entity<T> extends AggregateRoot {

    [x: string]: any;

    protected constructor(
        protected readonly props: T,               
        id?: EntityId,
        object_key?: string    
    ) {
        super();

        this.id = id ? id : new EntityId();
        this.object_key = object_key ? object_key : this.id.value;
    }

    public readonly id: EntityId;
    public readonly app: string;
    public readonly object_key: string;
    
    @Expose({name:'track'})
    private _track: ITrack;
    get track(): ITrack{
        return this._track;
    }

    @Expose({name: 'state'})
    private _state: IState;
    get state(): IState{
        return this._istate;
    }

    protected setTrack(track: ITrack){
        this._track = track;
    }

    protected setState(state: IState){
        this._state = state;
    }

    // protected setObjectKey(object_key: string){
    //     this._object_key = object_key;
    // }

    protected trackBy(owner: User){
        
        if (null === owner ||
            validator.isEmpty(owner.id))
            throw new Error('O proprietário não foi informado')

        this._track = {
            owner: owner,
            createdBy: owner,            
            modifiedBy: owner,
            createdOn: new Date(Date.now()),
            modifiedOn: new Date(Date.now())
        }

        this._state = {
            value: StateCode.Active,
            isDeleted: false
        }

    }
    public equals (object?: Entity<T>) : boolean {

        if (object == null || object == undefined) {
          return false;
        }
    
        if (this === object) {
          return true;
        }
    
        if (!isEntity(object)) {
          return false;
        }
    
        return this._id.equals(object._id);
      }
}


