import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { CategoriesModule } from './modules/categories/categories.module';
import { JwtModule } from '@nestjs/jwt';
import { FileUploadModule } from './modules/file-upload/file-upload.module';
import { OrdersModule } from './modules/orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) =>
        configService.get('typeorm') as TypeOrmModuleOptions,
    }),
    AuthModule,
    UsersModule,
    ProductsModule,
    CategoriesModule,
    FileUploadModule,
    OrdersModule,
    JwtModule.register({
      global: true,
      signOptions: {
        expiresIn: '12h',
      },
      secret: process.env.JWT_SECRET,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
