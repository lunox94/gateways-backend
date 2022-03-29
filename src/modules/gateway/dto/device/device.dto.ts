import { Device, DeviceStatus } from 'src/domain/device.model';

export class DeviceDto {
    readonly uid: number;
    readonly vendor: string;
    readonly createdAt: Date;
    readonly status: DeviceStatus;

    constructor(device: Device) {
        this.uid = device.uid;
        this.vendor = device.vendor;
        this.createdAt = device.createdAt;
        this.status = device.status;
    }
}
