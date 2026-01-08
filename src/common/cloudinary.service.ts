import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import toStream from 'buffer-to-stream';

@Injectable()
export class CloudinaryService {
  uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },
        (err, result) => {
          if (err)
            return reject(err instanceof Error ? err : new Error(String(err)));
          if (!result)
            return reject(new Error('Cloudinary no devolvió result'));
          return resolve(result);
        },
      );

      // "buffer-to-stream" no tiene buenos tipos => casteo simple
      (toStream as unknown as (b: Buffer) => NodeJS.ReadableStream)(
        file.buffer,
      ).pipe(upload);
    });
  }
}
