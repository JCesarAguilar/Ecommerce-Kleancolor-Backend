import { Body, Controller, Get, Post } from '@nestjs/common';
import { AddCategoryDto } from './dto/add-category.dto';
import { CategoriesService } from './categories.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Categories')
@Controller('/categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Post()
  async addCategory(@Body() body: AddCategoryDto) {
    return this.categoriesService.addCategory(body);
  }
}
