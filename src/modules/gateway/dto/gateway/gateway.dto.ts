import { Gateway } from 'src/domain/gateway.model';
import { DeviceDto } from '../device/device.dto';

export class GatewayDto {
    readonly uid: string;
    readonly name: string;
    readonly ipv4: string;
    readonly devices: DeviceDto[];

    constructor(gateway: Gateway) {
        this.uid = gateway.uid;
        this.name = gateway.name;
        this.ipv4 = gateway.ipv4;
        this.devices = gateway.devices.map((d) => new DeviceDto(d));
    }
}
