import {
    ArgumentsHost,
    BadRequestException,
    Catch,
    HttpException,
    HttpStatus,
    InternalServerErrorException,
    Logger,
    NotFoundException,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {
    AppException,
    DeviceNotFoundException,
    GatewayMaxNumberOfDevicesException,
    GatewayNotFoundException,
} from '../exceptions/exceptions';

@Catch(AppException)
export class AppExceptionFilter extends BaseExceptionFilter {
    private readonly _logger = new Logger(AppExceptionFilter.name);

    catch(exception: AppException, host: ArgumentsHost) {
        let _exception: HttpException;
        if (
            exception instanceof GatewayNotFoundException ||
            exception instanceof DeviceNotFoundException
        ) {
            _exception = new NotFoundException(exception.message);
        } else if (exception instanceof GatewayMaxNumberOfDevicesException) {
            _exception = new BadRequestException(exception.message);
        } else {
            _exception = new InternalServerErrorException(exception.message);
        }

        if (_exception.getStatus() === HttpStatus.INTERNAL_SERVER_ERROR) {
            this._logger.error(
                `Status: ${_exception.getStatus()} | Exception: ${
                    exception.name
                } | Stack: ${exception.stack}`,
            );
        } else {
            this._logger.log(
                `Status: ${_exception.getStatus()} | Exception: ${
                    exception.name
                }`,
            );
        }

        super.catch(_exception, host);
    }
}
