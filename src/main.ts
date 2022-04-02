import {
    UnprocessableEntityException,
    ValidationError,
    ValidationPipe,
} from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
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

    const config = new DocumentBuilder()
        .setTitle('Gateways API')
        .setDescription('The gateways API description')
        .setVersion('1.0')
        .addTag('gateways')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(3000);
}
bootstrap();
