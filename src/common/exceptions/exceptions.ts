import { MAX_DEVICES } from 'src/modules/gateway/gateway.service';

export class AppException extends Error {
    readonly name: string = 'generic_exception';
    readonly message: string = 'App internal error';
}

export class GatewayNotFoundException extends AppException {
    readonly name: string = 'gateway_not_found';
    readonly message: string = 'Gateway not found';
}

export class GatewayMaxNumberOfDevicesException extends AppException {
    readonly name: string = 'gateway_max_devices';
    readonly message: string =
        'Cannot add more than ' + MAX_DEVICES + ' devices per gateway';
}

export class DeviceNotFoundException extends AppException {
    readonly name: string = 'device_not_found';
    readonly message: string = 'Device not found';
}
