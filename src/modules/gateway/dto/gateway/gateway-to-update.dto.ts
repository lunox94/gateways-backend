import { GatewayToCreateDto } from '../dto';
import { PartialType } from '@nestjs/mapped-types';

export class GatewayToUpdateDto extends PartialType(GatewayToCreateDto) {}
