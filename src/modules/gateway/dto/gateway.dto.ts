import { Device } from 'src/domain/device/device.model';
import { Gateway } from 'src/domain/gateway/gateway.model';

export class GatewayDto {
    readonly uid: string;
    readonly name: string;
    readonly ipv4: string;
    readonly devices: Device[];

    constructor(gateway: Gateway) {
        this.uid = gateway.uid;
        this.name = gateway.name;
        this.ipv4 = gateway.ipv4;
        this.devices = [...gateway.devices];
    }
}
