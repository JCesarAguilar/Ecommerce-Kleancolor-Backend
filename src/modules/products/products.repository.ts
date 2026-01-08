import { Injectable } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';
import { v4 as uuid } from 'uuid';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async createProduct(product: CreateProductDto): Promise<string> {
    const newProduct = this.productRepository.create({
      id: uuid(),
      ...product,
    });
    await this.productRepository.save(newProduct);
    return newProduct.id;
  }

  async updateProduct(
    id: string,
    data: UpdateProductDto,
  ): Promise<string | undefined> {
    await this.productRepository.update(id, data);
    return id;
  }

  async deleteProduct(id: string): Promise<string | undefined> {
    const result = await this.productRepository.delete(id);
    if (result.affected && result.affected > 0) {
      return id;
    }
  }

  async updateImgUrl(id: string, imgUrl: string) {
    await this.productRepository.update({ id }, { imgUrl });
  }
}
