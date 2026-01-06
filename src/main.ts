import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use(loggerGlobalMiddleware);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
