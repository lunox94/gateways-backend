import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
} from '@nestjs/common';
import { Gateway } from 'src/domain/gateway/gateway.model';
import { GatewayDto, GatewayToCreateDto } from './dto/dto';
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

    @Post()
    post(@Body() gatewayToCreate: GatewayToCreateDto): GatewayDto {
        const gateway = this._gatewayService.post(gatewayToCreate);

        const gatewayToReturn = new GatewayDto(gateway);

        return gatewayToReturn;
    }
}
