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
import { Gateway } from 'src/domain/gateway/gateway.model';
import { GatewayDto, GatewayToCreateDto, GatewayToUpdate } from './dto/dto';
import { GatewayService } from './gateway.service';

@Controller('api/v1/gateways')
export class GatewayController {
    constructor(private readonly _gatewayService: GatewayService) {}

    @Get()
    getAll(): Gateway[] {
        return this._gatewayService.getAll();
    }

    @Get(':uid')
    get(@Param('uid') uid: string): Gateway {
        const gateway = this._gatewayService.get(uid);

        if (!gateway) {
            throw new HttpException('Gateway not found', HttpStatus.NOT_FOUND);
        }

        return gateway;
    }

    /**
     * Creates a new gateway.
     * @param gatewayToCreate Data to create a new gateway.
     * @returns The newly created gateway.
     */
    @Post()
    post(@Body() gatewayToCreate: GatewayToCreateDto): GatewayDto {
        const gateway = this._gatewayService.post(gatewayToCreate);

        const gatewayToReturn = new GatewayDto(gateway);

        return gatewayToReturn;
    }

    @Put(':uid')
    @HttpCode(204)
    put(
        @Param('uid') uid: string,
        @Body() gatewayToUpdate: GatewayToUpdate,
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
}
