import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { DeviceStatus } from 'src/domain/device/device.model';

export class DeviceToCreateDto {
    /** The vendor's name of the device. */
    @IsNotEmpty()
    @IsString()
    readonly vendor: string;

    @IsNotEmpty()
    @IsEnum(DeviceStatus)
    /** The status of the device, Online = 1, Offline = 2. */
    readonly status: DeviceStatus;
}
