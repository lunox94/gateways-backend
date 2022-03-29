import { DeviceToCreateDto } from '../dto';
import { PartialType } from '@nestjs/mapped-types';

export class DeviceToUpdateDto extends PartialType(DeviceToCreateDto) {}
