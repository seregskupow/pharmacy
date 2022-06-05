import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductsRepository {
  constructor(private prisma: PrismaService) {}

  getOneById(id: number) {
    return this.prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async find({
    search = null,
    categoryId = null,
    priceSort = null,
    pageNumber = 0,
    limit = 9,
    manufacturers = null,
  }: {
    search?: string | null;
    categoryId?: number | null;
    priceSort?: 'desc' | 'asc' | null;
    pageNumber?: number;
    limit?: number;
    manufacturers?: string | null;
  }) {
    console.log({ manufacturers });
    const totalRecords = await this.prisma.product.count({
      where: {
        name: {
          contains: search !== null ? search : undefined,
          mode: 'insensitive',
        },
        Manufacturer: {
          name: {
            in: manufacturers !== null ? manufacturers.split(',') : undefined,
          },
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
    const results = await this.prisma.product.findMany({
      skip: pageNumber * limit,
      take: limit,
      orderBy: [
        {
          price: priceSort !== null ? priceSort : 'desc',
        },
      ],
      include: {
        Manufacturer: true,
      },
      where: {
        name: {
          contains: search !== null ? search : undefined,
          mode: 'insensitive',
        },
        Manufacturer: {
          name: {
            in: manufacturers !== null ? manufacturers.split(',') : undefined,
          },
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
    return {
      totalRecords,
      data: results,
    };
  }

  getManufacturers() {
    return this.prisma.manufacturer.findMany();
  }

  async getPopularProducts() {
    const productsCount = await this.prisma.product.count();
    const skip = Math.floor(Math.random() * productsCount);
    return this.prisma.product.findMany({
      take: 6,
      skip: skip,
      include: {
        Manufacturer: true,
      },
    });
  }
}
