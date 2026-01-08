import { Injectable } from '@nestjs/common';
import { ProductsService } from '../products/products.service';
import { CloudinaryService } from 'src/common/cloudinary.service';

@Injectable()
export class FileUploadService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly productsService: ProductsService,
  ) {}

  async uploadProductImage(productId: string, file: Express.Multer.File) {
    const res = await this.cloudinaryService.uploadImage(file);
    const url = res.secure_url ?? res.url;

    await this.productsService.updateImgUrl(productId, url);

    return { productId, imgUrl: url };
  }
}
