import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import {
    AppException,
    DeviceNotFoundException,
    GatewayNotFoundException,
} from 'src/common/exceptions/exceptions';
import {
    DeviceDto,
    DeviceToCreateDto,
    DeviceToUpdateDto,
    GatewayDto,
    GatewayToCreateDto,
    GatewayToUpdateDto,
} from './dto/dto';
import { GatewayService } from './gateway.service';

/**
 * Allows CRUD operations on the Gateway resource and its Devices.
 */
@Controller('api/v1/gateways')
export class GatewayController {
    constructor(private readonly _gatewayService: GatewayService) {}

    /**
     * Returns all the gateways.
     * @returns A list with all the gateways.
     */
    @Get()
    getAll(): GatewayDto[] {
        return this._gatewayService.getAll().map((g) => new GatewayDto(g));
    }

    /**
     * Gets a gateway by its uid.
     * @param uid The uid of the gateway to return.
     * @returns The gateway if found.
     */
    @Get(':uid')
    get(@Param('uid') uid: string): GatewayDto {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new GatewayNotFoundException();
        }

        return new GatewayDto(gateway);
    }

    /**
     * Creates a new gateway.
     * @param gatewayToCreate Data to create a new gateway.
     * @returns The newly created gateway.
     */
    @Post()
    post(@Body() gatewayToCreate: GatewayToCreateDto): GatewayDto {
        const gateway = this._gatewayService.post(gatewayToCreate);

        return new GatewayDto(gateway);
    }

    /**
     * Updates an existing gateway.
     * @param uid Uid of the gateway to be updated.
     * @param gatewayToUpdate Data used to update the gateway.
     */
    @Put(':uid')
    @HttpCode(204)
    put(
        @Param('uid') uid: string,
        @Body() gatewayToUpdate: GatewayToUpdateDto,
    ): void {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new GatewayNotFoundException();
        }

        const result = this._gatewayService.put(gateway.uid, gatewayToUpdate);

        if (!result) {
            throw new AppException();
        }
    }

    /**
     * Deletes an existing gateway.
     * @param uid Uid of the gateway to be deleted.
     */
    @Delete(':uid')
    @HttpCode(204)
    delete(@Param('uid') uid: string): void {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new GatewayNotFoundException();
        }

        const result = this._gatewayService.delete(uid);

        if (!result) {
            throw new AppException();
        }
    }

    /**
     * Gets the list of the devices of a gateway.
     * @param uid The uid of the gateway that owns the devices.
     * @returns The list of devices for the given gateway.
     */
    @Get(':uid/devices')
    getGatewayDevices(@Param('uid') uid: string): DeviceDto[] {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new GatewayNotFoundException();
        }

        return gateway.devices.map((d) => new DeviceDto(d));
    }

    /**
     * Creates a new device for the given gateway.
     * @param uid The uid of the gateway that owns the device.
     * @param deviceToCreate Data to create the new device.
     * @returns The newly created device.
     */
    @Post(':uid/devices')
    postDevice(
        @Param('uid') uid: string,
        @Body() deviceToCreate: DeviceToCreateDto,
    ): DeviceDto {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new GatewayNotFoundException();
        }

        const device = this._gatewayService.postDevice(uid, deviceToCreate);

        if (!device) {
            throw new AppException();
        }

        return device;
    }

    /**
     * Updates an existing device.
     * @param uid The uid of the gateway that owns the device.
     * @param duid The uid of the device to be updated.
     * @param deviceToUpdate Data to update the device.
     */
    @Put(':uid/devices/:duid')
    @HttpCode(204)
    putDevice(
        @Param('uid') uid: string,
        @Param('duid') duid: number,
        @Body() deviceToUpdate: DeviceToUpdateDto,
    ): void {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new GatewayNotFoundException();
        }

        const device = gateway.devices.find((d) => d.uid === duid);

        if (!device) {
            throw new DeviceNotFoundException();
        }

        const result = this._gatewayService.putDevice(
            uid,
            duid,
            deviceToUpdate,
        );

        if (!result) {
            throw new AppException();
        }
    }
}
