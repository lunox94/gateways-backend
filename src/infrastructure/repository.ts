import { Device } from 'src/domain/device.model';
import { Gateway } from 'src/domain/gateway.model';

/**
 * A simple synchronous repository pattern interface.
 */
export abstract class Repository {
    abstract getAll(): Gateway[];
    abstract getOrNull(uid: string): Gateway | null;
    abstract add(gateway: Gateway): Gateway;
    abstract update(gateway: Gateway): void;
    abstract remove(gateway: Gateway): void;

    abstract addDevice(gateway: Gateway, device: Device): Device;
    abstract updateDevice(gateway: Gateway, device: Device): void;
    abstract removeDevice(gateway: Gateway, device: Device): void;
}
