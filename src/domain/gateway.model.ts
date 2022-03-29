import { Device } from './device.model';

export interface Gateway {
    uid: string;
    name: string;
    ipv4: string;
    devices: Device[];
}
