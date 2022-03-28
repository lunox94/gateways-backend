import { Injectable } from '@nestjs/common';
import { Gateway } from 'src/domain/gateway/gateway.model';
import { gateways } from 'src/mock/gateways.data';
import { v4 as uuidv4 } from 'uuid';
import { GatewayToCreateDto, GatewayToUpdateDto } from './dto/dto';

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
    post(gatewayToCreate: GatewayToCreateDto) {
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
    delete(uid: string) {
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
}
