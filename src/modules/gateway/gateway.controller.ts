import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import {
    DeviceDto,
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
            throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);
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
            throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);
        }

        const result = this._gatewayService.put(gateway.uid, gatewayToUpdate);

        if (!result) {
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    /**
     * Deletes an existing gateway.
     * @param uid Uid of the gateway to be deleted.
     */
    @Delete(':uid')
    @HttpCode(204)
    delete(@Param('uid') uid: string) {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);
        }

        const result = this._gatewayService.delete(uid);

        if (!result) {
            throw new HttpException(
                'Internal server error',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
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
            throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);
        }

        return gateway.devices.map((d) => new DeviceDto(d));
    }
}
