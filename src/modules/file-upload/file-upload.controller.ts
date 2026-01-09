import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  ParseUUIDPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file-upload.service';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('/files')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('/uploadImage/:id')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  uploadProductImage(
    @Param('id', new ParseUUIDPipe({ version: '4' })) productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 200 * 1024 }),
          new FileTypeValidator({ fileType: /(jpg|jpeg|png|webp)$/ }),
        ],
      }),
    )
    url: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadProductImage(productId, url);
  }
}
