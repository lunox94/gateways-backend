import { Injectable } from '@nestjs/common';
import { GatewayMaxNumberOfDevicesException } from 'src/common/exceptions/exceptions';
import { Device } from 'src/domain/device.model';
import { Gateway } from 'src/domain/gateway.model';
import { gateways } from 'src/mock/gateways.data';
import { v4 as uuidv4 } from 'uuid';
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
    private _gateways: Gateway[];

    constructor() {
        // Fill in-memory data with mock data.
        this._gateways = gateways;
    }

    /**
     * Gets all the gateways.
     * @returns List of gateways.
     */
    getAll(): Gateway[] {
        return this._gateways;
    }

    /**
     * Gets a gateway by its uid.
     * @param uid The gateway uid.
     * @returns Returns the gateway if found otherwise returns undefined.
     */
    get(uid: string): Gateway {
        return this._gateways.find((g) => g.uid == uid);
    }

    /**
     * Creates a new gateway.
     * @param gatewayToCreate Data to create the new gateway.
     * @returns The newly created gateway.
     */
    post(gatewayToCreate: GatewayToCreateDto): Gateway {
        const gateway: Gateway = {
            ...gatewayToCreate,
            uid: uuidv4(),
            devices: [],
        };

        this._gateways.push(gateway);

        return gateway;
    }

    /**
     *  Updates an existing gateway.
     * @param uid The uid of the gateway to be updated.
     * @param gatewayToUpdate Data to update the gateway.
     * @returns A boolean that indicates whether or not the operation completed
     * successfully.
     */
    put(uid: string, gatewayToUpdate: GatewayToUpdateDto): boolean {
        // find the index of the gateway that should be updated.
        const index = this._gateways.findIndex((g) => g.uid === uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning false.
        if (index === -1) {
            return false;
        }

        const newGateway = { ...this._gateways[index], ...gatewayToUpdate };

        this._gateways[index] = newGateway;

        return true;
    }

    /**
     * Deletes an existing gateway.
     * @param uid The uid of the gateway to be deleted.
     * @returns A boolean that indicates whether or not the operation completed
     * successfully.
     */
    delete(uid: string): boolean {
        // find the index of the gateway that should be deleted.
        const index = this._gateways.findIndex((g) => g.uid === uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning false.
        if (index === -1) {
            return false;
        }

        this._gateways.splice(index, 1);

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
        const gateway = this._gateways.find((g) => g.uid === uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning undefined.
        if (!gateway) {
            return undefined;
        }

        const device: Device = {
            ...deviceToCreate,
            // using Date.now() to the uid due the business specs dictates
            // the uid should be a number, as an in-memory solution is being used
            // a timestamp should fit the specs.
            uid: Date.now(),
            createdAt: new Date(),
        };

        if (gateway.devices.length >= MAX_DEVICES) {
            throw new GatewayMaxNumberOfDevicesException();
        }

        gateway.devices.push(device);

        return device;
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
        const gateway = this._gateways.find((g) => g.uid === uid);

        // if the gateway is not found then the operation cannot
        // be performed hence returning false.
        if (!gateway) {
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

        gateway.devices[deviceIndex] = newDevice;

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
        const gateway = this._gateways.find((g) => g.uid === uid);

        // if the gateway is not found then the operation cannot be performed
        // hence returning false.
        if (!gateway) {
            return false;
        }

        // find the index of the device to be deleted.
        const deviceIndex = gateway.devices.findIndex((d) => d.uid === duid);

        // if the device is not found then the operation cannot be performed
        // hence returning false.
        if (deviceIndex === -1) {
            return false;
        }

        gateway.devices.splice(deviceIndex, 1);

        return true;
    }
}
