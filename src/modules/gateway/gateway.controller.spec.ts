import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDb } from 'src/common/constants/constants';
import {
    AppException,
    DeviceNotFoundException,
    GatewayMaxNumberOfDevicesException,
    GatewayNotFoundException,
} from 'src/common/exceptions/exceptions';
import { Device, DeviceStatus } from 'src/domain/device.model';
import { Gateway } from 'src/domain/gateway.model';
import {
    DeviceDto,
    DeviceToCreateDto,
    DeviceToUpdateDto,
    GatewayDto,
    GatewayToCreateDto,
    GatewayToUpdateDto,
} from './dto/dto';
import { GatewayController } from './gateway.controller';
import { InMemoryRepositoryProvider } from './gateway.module';
import { GatewayService } from './gateway.service';

describe('GatewayController', () => {
    let controller: GatewayController;
    let service: GatewayService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GatewayController],
            providers: [
                GatewayService,
                InMemoryRepositoryProvider,
                {
                    provide: InMemoryDb,
                    useValue: [],
                },
            ],
        }).compile();

        controller = module.get<GatewayController>(GatewayController);
        service = module.get<GatewayService>(GatewayService);

        jest.spyOn(service, 'getAll').mockReturnValue(testGateways);
        jest.spyOn(service, 'get').mockReturnValue(testGateways[0]);
        jest.spyOn(service, 'post').mockReturnValue(testGateways[0]);
        jest.spyOn(service, 'put').mockReturnValue(true);
        jest.spyOn(service, 'delete').mockReturnValue(true);
        jest.spyOn(service, 'postDevice').mockReturnValue(testDevice);
        jest.spyOn(service, 'putDevice').mockReturnValue(true);
        jest.spyOn(service, 'deleteDevice').mockReturnValue(true);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getAll', () => {
        it('should call GatewayService.getAll', () => {
            controller.getAll();
            expect(service.getAll).toBeCalled();
        });

        it('should return a GatewayDto[]', () => {
            const result = controller.getAll();
            const expectedResult = service
                .getAll()
                .map((g) => new GatewayDto(g));
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe('get', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.get(testGatewayId);
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() => controller.get(testGatewayId)).toThrowError(
                GatewayNotFoundException,
            );
        });

        it('should return expected GatewayDto', () => {
            const result = controller.get(testGatewayId);
            const expectedResult = new GatewayDto(service.get(testGatewayId));
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe('post', () => {
        it('should call GatewayService.post with expected params', () => {
            controller.post(testGatewayToCreate);
            expect(service.post).toBeCalledWith(
                expect.objectContaining(testGatewayToCreate),
            );
        });

        it('should return expected GatewayDto', () => {
            const result = controller.post(testGatewayToCreate);
            const expectedResult = new GatewayDto(
                service.post(testGatewayToCreate),
            );
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe('put', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.put(testGatewayId, testGatewayToUpdate);
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() =>
                controller.put(testGatewayId, testGatewayToUpdate),
            ).toThrowError(GatewayNotFoundException);
        });

        it('should call GatewayService.put with expected params', () => {
            const gateway = service.get(testGatewayId);
            controller.put(testGatewayId, testGatewayToUpdate);
            expect(service.put).toBeCalledWith(
                gateway.uid,
                expect.objectContaining(testGatewayToUpdate),
            );
        });

        it('should throw AppException if GatewayService.put returns false', () => {
            jest.spyOn(service, 'put').mockReturnValue(false);

            expect(() =>
                controller.put(testGatewayId, testGatewayToUpdate),
            ).toThrowError(AppException);

            expect(service.put).toBeCalled();
        });

        it('should not throw any AppException if GatewayService.put returns true', () => {
            expect(() =>
                controller.put(testGatewayId, testGatewayToUpdate),
            ).not.toThrowError(AppException);

            expect(service.put).toBeCalled();
        });
    });

    describe('delete', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.delete(testGatewayId);
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() => controller.delete(testGatewayId)).toThrowError(
                GatewayNotFoundException,
            );
        });

        it('should call GatewayService.delete with expected params', () => {
            controller.delete(testGatewayId);
            expect(service.delete).toBeCalledWith(testGatewayId);
        });

        it('should throw AppException if GatewayService.delete returns false', () => {
            jest.spyOn(service, 'delete').mockReturnValue(false);

            expect(() => controller.delete(testGatewayId)).toThrowError(
                AppException,
            );

            expect(service.delete).toBeCalled();
        });

        it('should not throw any AppException if GatewayService.delete returns true', () => {
            expect(() => controller.delete(testGatewayId)).not.toThrowError(
                AppException,
            );

            expect(service.delete).toBeCalled();
        });
    });

    describe('getGatewayDevices', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.getGatewayDevices(testGatewayId);
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() =>
                controller.getGatewayDevices(testGatewayId),
            ).toThrowError(GatewayNotFoundException);
        });

        it('should return expected DeviceDto[]', () => {
            const result = controller.getGatewayDevices(testGatewayId);
            const expectedResult = service
                .get(testGatewayId)
                .devices.map((d) => new DeviceDto(d));
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe('postDevice', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.postDevice(testGatewayId, testDeviceToCreate);
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() =>
                controller.postDevice(testGatewayId, testDeviceToCreate),
            ).toThrowError(GatewayNotFoundException);
        });

        it('should call GatewayService.postDevice with expected params', () => {
            controller.postDevice(testGatewayId, testDeviceToCreate);
            expect(service.postDevice).toBeCalledWith(
                testGatewayId,
                expect.objectContaining(testDeviceToCreate),
            );
        });

        it('should throw exception if max devices', () => {
            jest.spyOn(service, 'postDevice').mockImplementation(
                (_: string) => {
                    throw new GatewayMaxNumberOfDevicesException();
                },
            );
            expect(() =>
                controller.postDevice(testGatewayId, testDeviceToCreate),
            ).toThrowError(GatewayMaxNumberOfDevicesException);
        });

        it('should return expected DeviceDto', () => {
            const result = controller.postDevice(
                testGatewayId,
                testDeviceToCreate,
            );
            const expectedResult = new DeviceDto(
                service.postDevice(testGatewayId, testDeviceToCreate),
            );
            expect(result).toStrictEqual(expectedResult);
        });
    });

    describe('putDevice', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.putDevice(
                testGatewayId,
                testDeviceId,
                testDeviceToUpdate,
            );
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() =>
                controller.putDevice(
                    testGatewayId,
                    testDeviceId,
                    testDeviceToUpdate,
                ),
            ).toThrowError(GatewayNotFoundException);
        });

        it('should throw DeviceNotFoundException if device does not exist', () => {
            expect(() =>
                controller.putDevice(testGatewayId, -1, testDeviceToUpdate),
            ).toThrowError(DeviceNotFoundException);
        });

        it('should throw AppException if GatewayService.putDevice returns false', () => {
            jest.spyOn(service, 'putDevice').mockReturnValue(false);
            expect(() =>
                controller.putDevice(
                    testGatewayId,
                    testDeviceId,
                    testDeviceToUpdate,
                ),
            ).toThrowError(AppException);
            expect(service.putDevice).toBeCalled();
        });

        it('should not throw any AppException if GatewayService.putDevice returns true', () => {
            expect(() =>
                controller.putDevice(
                    testGatewayId,
                    testDeviceId,
                    testDeviceToUpdate,
                ),
            ).not.toThrowError(AppException);
        });
    });

    describe('deleteDevice', () => {
        it('should call GatewayService.get with expected params', () => {
            controller.deleteDevice(testGatewayId, testDeviceId);
            expect(service.get).toBeCalledWith(testGatewayId);
        });

        it('should throw GatewayNotFoundException if gateway does not exist', () => {
            jest.spyOn(service, 'get').mockReturnValue(null);
            expect(() =>
                controller.deleteDevice(testGatewayId, testDeviceId),
            ).toThrowError(GatewayNotFoundException);
        });

        it('should throw DeviceNotFoundException if device does not exist', () => {
            expect(() =>
                controller.deleteDevice(testGatewayId, -1),
            ).toThrowError(DeviceNotFoundException);
        });

        it('should throw AppException if GatewayService.deleteDevice returns false', () => {
            jest.spyOn(service, 'deleteDevice').mockReturnValue(false);
            expect(() =>
                controller.deleteDevice(testGatewayId, testDeviceId),
            ).toThrowError(AppException);
            expect(service.deleteDevice).toBeCalled();
        });

        it('should not throw any AppException if GatewayService.deleteDevice returns true', () => {
            expect(() =>
                controller.deleteDevice(testGatewayId, testDeviceId),
            ).not.toThrowError(AppException);
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
    ipv4: '150.150.150.151',
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
