import { Module } from '@nestjs/common';
import { gateways } from 'src/mock/gateways.data';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { Repository } from 'src/infrastructure/repository';
import { InMemoryRepository } from 'src/infrastructure/in-memory-repository';
import { InMemoryDb } from 'src/common/constants/constants';

@Module({
    controllers: [GatewayController],
    providers: [
        GatewayService,
        {
            provide: Repository,
            useClass: InMemoryRepository,
        },
        {
            provide: InMemoryDb,
            useValue: gateways,
        },
    ],
})
export class GatewayModule {}
