import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './categories.controller';
import { PrismaService } from '@core/prisma/prisma.service';
import { CategoryRepository } from './repositories/category.repository';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoryRepository, PrismaService],
  imports: [PrismaService],
})
export class CategoriesModule {}
