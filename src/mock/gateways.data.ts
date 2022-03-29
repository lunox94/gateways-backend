import { Gateway } from 'src/domain/gateway.model';

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
        devices: [
            {
                vendor: 'Cisco',
                status: 1,
                uid: 1648516832755,
                createdAt: new Date('2022-03-29T01:20:32.755Z'),
            },
            {
                vendor: 'Microsoft',
                status: 1,
                uid: 1648516920731,
                createdAt: new Date('2022-03-29T01:22:00.731Z'),
            },
            {
                vendor: 'F5 Networks',
                status: 1,
                uid: 1648517189696,
                createdAt: new Date('2022-03-29T01:26:29.696Z'),
            },
            {
                vendor: 'Barracuda',
                status: 0,
                uid: 1648517218598,
                createdAt: new Date('2022-03-29T01:26:58.598Z'),
            },
            {
                vendor: 'GCP',
                status: 0,
                uid: 1648517268806,
                createdAt: new Date('2022-03-29T01:27:48.806Z'),
            },
            {
                vendor: 'Wavecrest',
                status: 1,
                uid: 1648517309613,
                createdAt: new Date('2022-03-29T01:28:29.613Z'),
            },
            {
                vendor: 'FireEye',
                status: 0,
                uid: 1648517378412,
                createdAt: new Date('2022-03-29T01:29:38.412Z'),
            },
            {
                vendor: 'FireEye',
                status: 1,
                uid: 1648517433120,
                createdAt: new Date('2022-03-29T01:30:33.120Z'),
            },
            {
                vendor: 'Cisco',
                status: 0,
                uid: 1648517454291,
                createdAt: new Date('2022-03-29T01:30:54.291Z'),
            },
            {
                vendor: 'Zscaler',
                status: 0,
                uid: 1648517554509,
                createdAt: new Date('2022-03-29T01:32:34.509Z'),
            },
        ],
    },
];
