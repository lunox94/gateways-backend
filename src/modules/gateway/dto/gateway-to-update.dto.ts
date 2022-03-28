import { GatewayToCreateDto } from './dto';
import { PartialType } from '@nestjs/mapped-types';

export class GatewayToUpdate extends PartialType(GatewayToCreateDto) {}
