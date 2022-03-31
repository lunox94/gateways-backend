import { Injectable } from '@nestjs/common';
import { GatewayMaxNumberOfDevicesException } from 'src/common/exceptions/exceptions';
import { Device } from 'src/domain/device.model';
import { Gateway } from 'src/domain/gateway.model';
import { Repository } from 'src/infrastructure/repository';
import {
    DeviceToCreateDto,
    DeviceToUpdateDto,
    GatewayToCreateDto,
    GatewayToUpdateDto,
} from './dto/dto';

export const MAX_DEVICES = 10;

/**
 * Cover all use cases for the Gateway resource including CRUD operations
 * over itself and its Devices.
 */
@Injectable()
export class GatewayService {
    constructor(private _repository: Repository) {}

    /**
     * Gets all gateways.
     * @returns List of gateways.
     */
    getAll(): Gateway[] {
        return this._repository.getAll();
        // return this._gateways;
    }

    /**
     * Gets a gateway by its uid.
     * @param uid The gateway uid.
     * @returns Returns the gateway if found otherwise returns null.
     */
    get(uid: string): Gateway {
        return this._repository.getOrNull(uid);
    }

    /**
     * Creates a new gateway.
     * @param gatewayToCreate Data to create the new gateway.
     * @returns The newly created gateway.
     */
    post(gatewayToCreate: GatewayToCreateDto): Gateway {
        const gateway = {
            ...gatewayToCreate,
        } as Gateway;

        return this._repository.add(gateway);
    }

    /**
     *  Updates an existing gateway.
     * @param uid The uid of the gateway to be updated.
     * @param gatewayToUpdate Data to update the gateway.
     * @returns A boolean that indicates whether or not the operation completed
     * successfully.
     */
    put(uid: string, gatewayToUpdate: GatewayToUpdateDto): boolean {
        // find the  gateway that should be updated.
        const gateway = this._repository.getOrNull(uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning false.
        if (gateway === null) {
            return false;
        }

        const newGateway: Gateway = {
            ...gateway,
            ...gatewayToUpdate,
        };

        this._repository.update(newGateway);

        return true;
    }

    /**
     * Deletes an existing gateway.
     * @param uid The uid of the gateway to be deleted.
     * @returns A boolean that indicates whether or not the operation completed
     * successfully.
     */
    delete(uid: string): boolean {
        // find the  gateway that should be deleted.
        const gateway = this._repository.getOrNull(uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning false.
        if (gateway === null) {
            return false;
        }

        this._repository.remove(gateway);

        return true;
    }

    /**
     * Creates a new device for the given gateway.
     * @param uid The uid of the gateway that owns the device.
     * @param deviceToCreate Data to create the device.
     * @returns The newly created device or undefined if the operation could
     * not be performed.
     */
    postDevice(
        uid: string,
        deviceToCreate: DeviceToCreateDto,
    ): Device | undefined {
        // find the gateway that should own this device.
        const gateway = this._repository.getOrNull(uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning undefined.
        if (gateway === null) {
            return undefined;
        }

        if (gateway.devices.length >= MAX_DEVICES) {
            throw new GatewayMaxNumberOfDevicesException();
        }

        const device = {
            ...deviceToCreate,
        } as Device;

        return this._repository.addDevice(gateway, device);
    }

    /**
     * Updates an existing device.
     * @param uid The uid of the gateway that owns this device.
     * @param duid The uid of the device to be updated.
     * @param deviceToUpdate Data to update the device.
     * @returns A boolean that indicates whether or not the operation completed
     * successfully.
     */
    putDevice(
        uid: string,
        duid: number,
        deviceToUpdate: DeviceToUpdateDto,
    ): boolean {
        // find the gateway that should own this device.
        const gateway = this._repository.getOrNull(uid);

        // if the gateway is not found then the operation cannot
        // be performed hence returning false.
        if (gateway === null) {
            return false;
        }

        // find the index of the device to be updated.
        const deviceIndex = gateway.devices.findIndex((d) => d.uid === duid);

        // if the device is not found then the operation cannot
        // be performed hence returning false.
        if (deviceIndex === -1) {
            return false;
        }

        const newDevice = {
            ...gateway.devices[deviceIndex],
            ...deviceToUpdate,
        };

        this._repository.updateDevice(gateway, newDevice);

        return true;
    }

    /**
     * Deletes an existing device.
     * @param uid The uid of the gateway that owns the device.
     * @param duid The uid of the device to be deleted.
     * @returns A boolean that indicates whether or not the operation completed
     * successfully.
     */
    deleteDevice(uid: string, duid: number): boolean {
        const gateway = this._repository.getOrNull(uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning false.
        if (gateway === null) {
            return false;
        }

        // find the index of the device to be deleted.
        const deviceIndex = gateway.devices.findIndex((d) => d.uid === duid);

        // if the device is not found then the operation cannot be performed
        // hence returning false.
        if (deviceIndex === -1) {
            return false;
        }

        this._repository.removeDevice(gateway, gateway.devices[deviceIndex]);

        return true;
    }
}
