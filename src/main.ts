import {
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppExceptionFilter } from './common/filters/app-exception.filter';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
            exceptionFactory: (errors: ValidationError[]) => {
                const _errors = errors
                    .map((e) => {
                        return Object.values(e.constraints);
                    })
                    .flat();
                return new UnprocessableEntityException(_errors);
            },
        }),
    );
    const { httpAdapter } = app.get(HttpAdapterHost);
    app.useGlobalFilters(new AppExceptionFilter(httpAdapter));

    // configure CORS policies
    app.enableCors();

    await app.listen(3000);
}
bootstrap();
