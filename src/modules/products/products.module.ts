import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './repositories/products.repository';
import { PrismaService } from '@core/prisma/prisma.service';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository, PrismaService],
  imports: [PrismaService],
})
export class ProductsModule {}
