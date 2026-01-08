import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { BadRequestException } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const cleanErrors = errors.map((error) => {
          return { property: error.property, constraints: error.constraints };
        });
        return new BadRequestException({
          alert: 'Se han detectado los siguientes errores:',
          errors: cleanErrors,
        });
      },
    }),
  );
  app.use(loggerGlobalMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
