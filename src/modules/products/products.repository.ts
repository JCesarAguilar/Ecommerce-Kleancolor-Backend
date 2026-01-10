import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteResult } from 'typeorm/browser';
import { UpdateResult } from 'typeorm/browser';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(page = 1, limit = 5): Promise<Product[]> {
    const skip = (page - 1) * limit;
    return this.productRepository.find({
      skip,
      take: limit,
      order: { name: 'ASC' },
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    return product;
  }

  async createProduct(product: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(product);
    return this.productRepository.save(newProduct);
  }

  async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<UpdateResult> {
    return this.productRepository.update(id, data);
  }

  async deleteProduct(id: string): Promise<DeleteResult> {
    return this.productRepository.delete(id);
  }

  async updateImgUrl(id: string, imgUrl: string) {
    await this.productRepository.update({ id }, { imgUrl });
  }
}
