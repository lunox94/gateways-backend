import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
} from '@nestjs/common';
import { Gateway } from 'src/domain/gateway/gateway.model';
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
}
