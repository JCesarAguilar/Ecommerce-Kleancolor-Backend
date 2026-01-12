import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobalMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { BadRequestException } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Documentacion API Kleancolor Backend')
    .setDescription(`Esta es una API construida con Nest para un Ecommerce`)
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
