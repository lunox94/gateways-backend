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
    {
        uid: 'f99ac8b5-ee9d-49ef-b8a1-c1014b34c356',
        name: 'Microsoft CEPoint',
        ipv4: '0.0.0.0',
        devices: [],
    },
    {
        uid: '259b9181-c07e-4d6a-8e6d-444b613a0ccf',
        name: 'BARRACUDA HUB',
        ipv4: '10.12.1.2',
        devices: [
            {
                uid: 1648517554512,
                vendor: 'Barracuda',
                createdAt: new Date('2022-04-02T06:36:52.715Z'),
                status: 0,
            },
            {
                uid: 1648517554513,
                vendor: 'Barracuda',
                createdAt: new Date('2022-04-02T06:37:07.731Z'),
                status: 1,
            },
        ],
    },
    {
        uid: '187aeef2-42e0-4a14-9e38-5648297fe223',
        name: 'Azure Front Door',
        ipv4: '187.54.95.2',
        devices: [],
    },
    {
        uid: '18ebceb4-5daf-44bc-b9b4-fc4b420dff4d',
        name: 'Traffic Manager',
        ipv4: '8.8.8.8',
        devices: [],
    },
    {
        uid: '0289120a-2f3e-47e1-b06d-8da052c8b2cb',
        name: 'PCIe',
        ipv4: '112.112.4.4',
        devices: [
            {
                uid: 1648517554510,
                vendor: 'Microsoft Pointer',
                createdAt: new Date('2022-04-02T06:34:29.348Z'),
                status: 0,
            },
            {
                uid: 1648517554511,
                vendor: 'Atheros 1088',
                createdAt: new Date('2022-04-02T06:35:07.196Z'),
                status: 0,
            },
        ],
    },
    {
        uid: '2b2b8ff4-65ec-4c85-a357-1b00c6061cca',
        name: 'X556U',
        ipv4: '10.12.1.1',
        devices: [],
    },
    {
        uid: '9b4faf0d-6c05-48a5-9527-aa1f6e9d00f6',
        name: 'Master Hub',
        ipv4: '0.0.0.1',
        devices: [],
    },
    {
        uid: '8276576d-bf80-4a5a-a702-61e897c22d13',
        name: 'REF. SAF 407Z',
        ipv4: '100.0.0.2',
        devices: [],
    },
    {
        uid: '1bb8d954-6cd9-446c-bfa4-154f975b0f17',
        name: 'BACK DOOR',
        ipv4: '6.6.8.44',
        devices: [],
    },
];
