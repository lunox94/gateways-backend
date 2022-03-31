import { Inject } from '@nestjs/common';
import { InMemoryDb } from 'src/common/constants/constants';
import { Device } from 'src/domain/device.model';
import { Gateway } from 'src/domain/gateway.model';
import { Repository } from './repository';
import { v4 as uuidv4 } from 'uuid';
import { AppException } from 'src/common/exceptions/exceptions';

/**
 * A very simple in-memory repository using an array.
 */
export class InMemoryRepository extends Repository {
    private _array: Gateway[];

    constructor(@Inject(InMemoryDb) array: Gateway[]) {
        super();
        this._array = array;
    }

    getAll(): Gateway[] {
        return this._cloneArray();
    }

    getOrNull(uid: string): Gateway | null {
        return this._cloneGateway(this._array.find((g) => g.uid === uid));
    }

    add(gateway: Gateway): Gateway {
        gateway.uid = uuidv4();
        gateway.devices = [];

        this._array.push(gateway);

        return this._cloneGateway(gateway);
    }

    update(gateway: Gateway): void {
        const index = this._array.findIndex((g) => g.uid === gateway.uid);

        if (index === -1) {
            throw new AppException('Attempted to update unexisting gateway.');
        }

        this._array[index] = gateway;
    }

    remove(gateway: Gateway): void {
        const index = this._array.findIndex((g) => g.uid === gateway.uid);

        if (index === -1) {
            throw new AppException('Attempted to remove unexisting gateway.');
        }

        this._array.splice(index, 1);
    }

    addDevice(gateway: Gateway, device: Device): Device {
        const _gateway = this._array.find((g) => g.uid == gateway.uid);

        if (!_gateway) {
            throw new AppException(
                'Cannot add a device to unexisting gateway.',
            );
        }

        device.uid = this._generateDeviceUid();
        device.createdAt = new Date();

        _gateway.devices.push(device);

        return this._cloneDevice(device);
    }

    updateDevice(gateway: Gateway, device: Device): void {
        const _gateway = this._array.find((g) => g.uid == gateway.uid);

        if (!_gateway) {
            throw new AppException(
                'Cannot update a device from an unexisting gateway.',
            );
        }

        const deviceIndex = _gateway.devices.findIndex(
            (d) => d.uid == device.uid,
        );

        if (deviceIndex === -1) {
            throw new AppException('Cannot update unexisting device.');
        }

        _gateway.devices[deviceIndex] = device;
    }

    removeDevice(gateway: Gateway, device: Device): void {
        const _gateway = this._array.find((g) => g.uid == gateway.uid);

        if (!_gateway) {
            throw new AppException(
                'Cannot remove a device from an unexisting gateway.',
            );
        }

        const deviceIndex = _gateway.devices.findIndex(
            (d) => d.uid == device.uid,
        );

        if (deviceIndex === -1) {
            throw new AppException('Cannot remove unexisting device.');
        }

        _gateway.devices.splice(deviceIndex, 1);
    }

    private _cloneArray(): Gateway[] {
        return this._array.map((g) => this._cloneGateway(g));
    }

    /** Artifact to deep clone a gateway. */
    private _cloneGateway(gateway?: Gateway): Gateway {
        return !!gateway
            ? {
                  ...gateway,
                  devices: gateway.devices.map((d) => this._cloneDevice(d)),
              }
            : null;
    }

    /** Artifact to deep clone a device. */
    private _cloneDevice(device?: Device): Device {
        return !!device
            ? { ...device, createdAt: new Date(device.createdAt.getTime()) }
            : null;
    }

    /** Artifact to generate a device uid. */
    private _generateDeviceUid(): number {
        const devices = this._array.flatMap((g) => g.devices);

        const maxUid = devices.reduce(
            (max, device) => (max > device.uid ? max : device.uid),
            0,
        );

        return maxUid + 1;
    }
}
