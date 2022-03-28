import { Gateway } from 'src/domain/gateway/gateway.model';

export const gateways: Gateway[] = [
    {
        uid: '1',
        ipv4: '192.168.1.1',
        name: 'PORTAL-8099',
        devices: [],
    },
    {
        uid: '2',
        ipv4: '192.168.1.2',
        name: 'PORTAL-1005',
        devices: [],
    },
    {
        uid: '3',
        ipv4: '192.168.1.2',
        name: 'BACKDOOR-37',
        devices: [],
    },
];
