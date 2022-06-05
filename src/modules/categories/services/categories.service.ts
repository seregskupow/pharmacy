import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';
import { CategoryRepository } from '../repositories/category.repository';

@Injectable()
export class CategoriesService {
  constructor(private categoryRepository: CategoryRepository) {}

  create(createCategoryDto: CreateCategoryDto) {
    return 'This action adds a new category';
  }

  findAll() {
    return this.categoryRepository.getAllParentCategories();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
