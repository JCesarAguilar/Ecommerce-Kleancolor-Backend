import { Injectable } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';
import { CategoriesRepository } from './categories.repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async getAllCategories() {
    return this.categoriesRepository.getAllCategories();
  }

  async addCategory(category: AddCategoryDto) {
    return this.categoriesRepository.addCategory(category);
  }
}
