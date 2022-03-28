import {
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

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
    await app.listen(3000);
}
bootstrap();
