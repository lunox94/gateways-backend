import { Controller, Get, Param } from '@nestjs/common';
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
        return this._gatewayService.get(uid);
    }
}
