import { Gateway } from 'src/domain/gateway/gateway.model';

export const gateways: Gateway[] = [
    {
        uid: '725e0f9c-da72-4f12-8f27-5853d245c4c7',
        name: 'FRONT-WEAR',
        ipv4: '192.168.0.0',
        devices: [
            {
                vendor: 'CISCO',
                status: 1,
                uid: 1648498666567,
                createdAt: new Date('2022-03-28T20:17:46.567Z'),
            },
        ],
    },
    {
        uid: '76272bad-e4af-4961-9cc6-bfe322fd1509',
        name: 'X-WWW-ENCODED',
        ipv4: '255.255.0.0',
        devices: [],
    },
];
