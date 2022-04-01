import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDb } from 'src/common/constants/constants';
import { GatewayMaxNumberOfDevicesException } from 'src/common/exceptions/exceptions';
import { Device, DeviceStatus } from 'src/domain/device.model';
import { Gateway } from 'src/domain/gateway.model';
import { Repository } from 'src/infrastructure/repository';
import {
    DeviceToCreateDto,
    DeviceToUpdateDto,
    GatewayToCreateDto,
    GatewayToUpdateDto,
} from './dto/dto';
import { InMemoryRepositoryProvider } from './gateway.module';
import { GatewayService } from './gateway.service';

describe('GatewayService', () => {
    let service: GatewayService;
    let repository: Repository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GatewayService,
                InMemoryRepositoryProvider,
                {
                    provide: InMemoryDb,
                    useValue: [],
                },
            ],
        }).compile();

        service = module.get<GatewayService>(GatewayService);
        repository = module.get(Repository);

        jest.spyOn(repository, 'getAll').mockReturnValue(testGateways);
        jest.spyOn(repository, 'getOrNull').mockReturnValue(testGateways[0]);
        jest.spyOn(repository, 'add').mockReturnValue(testGateways[0]);
        jest.spyOn(repository, 'update').mockReturnValue();
        jest.spyOn(repository, 'remove').mockReturnValue();
        jest.spyOn(repository, 'addDevice').mockReturnValue(testDevice);
        jest.spyOn(repository, 'updateDevice').mockReturnValue();
        jest.spyOn(repository, 'removeDevice').mockReturnValue();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('getAll', () => {
        it('should call Repository.getAll', () => {
            service.getAll();
            expect(repository.getAll).toBeCalled();
        });

        it('should get all gateways', () => {
            expect(service.getAll()).toStrictEqual(testGateways);
        });
    });

    describe('get', () => {
        it('should call Repository.getOrNull with desired id', () => {
            service.get(testGatewayId);
            expect(repository.getOrNull).toBeCalledWith(testGatewayId);
        });

        it('should return the same that Repository.getOrNull', () => {
            expect(service.get(testGatewayId)).toStrictEqual(
                repository.getOrNull(testGatewayId),
            );
        });
    });

    describe('post', () => {
        it('should call Repository.add with expected params', () => {
            service.post(testGatewayToCreate);
            expect(repository.add).toBeCalledWith(
                expect.objectContaining({ ...testGatewayToCreate }),
            );
        });

        it('should return the same that Repository.add', () => {
            expect(service.post(testGatewayToCreate)).toStrictEqual(
                testGateways[0],
            );
        });
    });

    describe('put', () => {
        it('should call Repository.getOrNull with expected params', () => {
            service.put(testGatewayId, null);
            expect(repository.getOrNull).toBeCalledWith(testGatewayId);
        });

        it('should return false if gateway does not exist', () => {
            jest.spyOn(repository, 'getOrNull').mockReturnValue(null);
            expect(service.put(testGatewayId, testGatewayToUpdate)).toBe(false);
        });

        it('should return true after call Repository.update with expected params', () => {
            const result = service.put(testGatewayId, testGatewayToUpdate);
            expect(repository.update).toBeCalledWith(
                expect.objectContaining({ ...testGatewayToUpdate }),
            );
            expect(result).toBe(true);
        });
    });

    describe('delete', () => {
        it('should call Repository.getOrNull with expected params', () => {
            service.delete(testGatewayId);
            expect(repository.getOrNull).toBeCalledWith(testGatewayId);
        });

        it('should return false if gateway does not exist', () => {
            jest.spyOn(repository, 'getOrNull').mockReturnValue(null);
            expect(service.delete(testGatewayId)).toBe(false);
        });

        it('should return true after call Repository.delete', () => {
            const result = service.delete(testGatewayId);
            expect(repository.remove).toBeCalledWith({
                ...repository.getOrNull(testGatewayId),
            });
            expect(result).toBe(true);
        });
    });

    describe('postDevice', () => {
        it('should call Repository.getOrNull with expected params', () => {
            service.postDevice(testGatewayId, null);
            expect(repository.getOrNull).toBeCalledWith(testGatewayId);
        });

        it('should return undefined if gateway does not exist', () => {
            jest.spyOn(repository, 'getOrNull').mockReturnValue(null);
            expect(service.postDevice(testGatewayId, null)).toBe(undefined);
        });

        it('should throw exception if max devices', () => {
            jest.spyOn(repository, 'getOrNull').mockReturnValue(
                testGateways[1],
            );
            expect(() =>
                service.postDevice(testGatewayId, testDeviceToCreate),
            ).toThrowError(GatewayMaxNumberOfDevicesException);
        });

        it('should call Repository.addDevice with expected params', () => {
            service.postDevice(testGatewayId, testDeviceToCreate);
            expect(repository.addDevice).toBeCalledWith(
                expect.objectContaining({ ...testGateways[0] }),
                expect.objectContaining({ ...testDeviceToCreate }),
            );
        });

        it('should return the same that Repository.addDevice', () => {
            expect(
                service.postDevice(testGatewayId, testDeviceToCreate),
            ).toStrictEqual(testDevice);
        });
    });

    describe('putDevice', () => {
        it('should call Repository.getOrNull with expected params', () => {
            service.putDevice(testGatewayId, testDeviceId, null);
            expect(repository.getOrNull).toBeCalledWith(testGatewayId);
        });

        it('should return false if gateway does not exist', () => {
            jest.spyOn(repository, 'getOrNull').mockReturnValue(null);
            expect(service.putDevice(testGatewayId, testDeviceId, null)).toBe(
                false,
            );
        });

        it('should return false if device does not exist', () => {
            expect(service.putDevice(testGatewayId, -1, null)).toBe(false);
        });

        it('should call Repository.updateDevice with expected params and return true', () => {
            const result = service.putDevice(
                testGatewayId,
                testDeviceId,
                testDeviceToUpdate,
            );
            expect(repository.updateDevice).toBeCalledWith(
                expect.objectContaining({ ...testGateways[0] }),
                expect.objectContaining({ ...testDeviceToUpdate }),
            );
            expect(result).toBe(true);
        });
    });

    describe('deleteDevice', () => {
        it('should call Repository.getOrNull with expected params', () => {
            service.deleteDevice(testGatewayId, testDeviceId);
            expect(repository.getOrNull).toBeCalledWith(testGatewayId);
        });

        it('should return false if gateway does not exist', () => {
            jest.spyOn(repository, 'getOrNull').mockReturnValue(null);
            expect(service.deleteDevice(testGatewayId, testDeviceId)).toBe(
                false,
            );
        });

        it('should return false if device does not exist', () => {
            expect(service.deleteDevice(testGatewayId, -1)).toBe(false);
        });

        it('should call Repository.deleteDevice with expected params and return true', () => {
            const result = service.deleteDevice(testGatewayId, testDeviceId);
            expect(repository.removeDevice).toBeCalledWith(
                expect.objectContaining({ ...testGateways[0] }),
                expect.objectContaining({ ...testDevice }),
            );
            expect(result).toBe(true);
        });
    });
});

const testGatewayId = '725e0f9c-da72-4f12-8f27-5853d245c4c7';

const testGatewayToCreate: GatewayToCreateDto = {
    name: 'Generic gateway',
    ipv4: '150.150.150.150',
};

const testGatewayToUpdate: GatewayToUpdateDto = {
    name: 'Generic gateway',
    ipv4: '150.150.150.150',
};

const testDeviceId = 1648498666567;

const testDeviceToCreate: DeviceToCreateDto = {
    vendor: 'CISCO',
    status: DeviceStatus.Offline,
};

const testDeviceToUpdate: DeviceToUpdateDto = {
    vendor: 'CISCO',
    status: DeviceStatus.Offline,
};

const testDevice: Device = {
    vendor: 'CISCO',
    status: 1,
    uid: 1648498666567,
    createdAt: new Date('2022-03-28T20:17:46.567Z'),
};

const testGateways: Gateway[] = [
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
