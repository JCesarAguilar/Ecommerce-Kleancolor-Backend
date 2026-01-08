import { Module } from '@nestjs/common';
import { FileUploadController } from './file-upload.controller';
import { ProductsModule } from '../products/products.module';
import { FileUploadService } from './file-upload.service';
import { CloudinaryProvider } from 'src/config/cloudinary.provider';
import { CloudinaryService } from 'src/common/cloudinary.service';

@Module({
  imports: [ProductsModule],
  controllers: [FileUploadController],
  providers: [FileUploadService, CloudinaryProvider, CloudinaryService],
})
export class FileUploadModule {}
