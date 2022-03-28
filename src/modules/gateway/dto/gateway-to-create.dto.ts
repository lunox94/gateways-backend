import { IsIP, IsNotEmpty, IsString } from 'class-validator';

export class GatewayToCreateDto {
    /** A friendly name for the gateway. */
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    /** An IPv4 address. */
    @IsNotEmpty()
    @IsIP('4')
    ipv4: string;
}
