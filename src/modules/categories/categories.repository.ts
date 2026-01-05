import { Category } from './entities/category.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories() {
    return this.categoryRepository.find();
  }

  async addCategory(dto: AddCategoryDto) {
    const newCategory = this.categoryRepository.create(dto);
    return this.categoryRepository.save(newCategory);
  }
}
