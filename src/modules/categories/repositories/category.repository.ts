import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryRepository {
  constructor(private prisma: PrismaService) {}

  getAllParentCategories() {
    return this.prisma.category.findMany({
      where: { parentCategoryId: null },
      select: {
        id: true,
        description: true,
        image: true,
        name: true,
        parentCategoryId: true,
        SubCategories: {
          select: {
            id: true,
            description: true,
            image: true,
            name: true,
            parentCategoryId: true,
          },
        },
      },
    });
  }

  getOneById(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  find(
    search = null,
    categoryId = null,
    nameSort: 'desc' | 'asc' = 'desc',
    priceSort: 'desc' | 'asc' = 'desc',
    pageNumber = 0,
    limit = 10,
  ) {
    return this.prisma.product.findMany({
      skip: pageNumber * limit,
      take: limit,
      orderBy: [
        {
          price: priceSort,
        },
        {
          name: nameSort,
        },
      ],
      where: {
        name: {
          contains: search !== null ? search : undefined,
          mode: 'insensitive',
        },
        categories: {
          every: {
            category: {
              id: categoryId !== null ? categoryId : undefined,
            },
          },
        },
      },
    });
  }
}
