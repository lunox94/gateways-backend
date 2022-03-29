import { MAX_DEVICES } from 'src/modules/gateway/gateway.service';

export class AppException extends Error {
    readonly name: string;
    readonly message: string;
    stack?: string;
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
