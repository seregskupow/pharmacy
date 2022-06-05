import { Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { ProductsRepository } from '../repositories/products.repository';

@Injectable()
export class ProductsService {
  constructor(private productsRepository: ProductsRepository) {}
  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  findMany(
    categoryId: number | null = null,
    search: string | null = null,
    page = 0,
    price = null,
    manufacturers: string | null = null,
  ) {
    return this.productsRepository.find({
      categoryId,
      search,
      pageNumber: page,
      priceSort: price,
      manufacturers,
    });
  }

  getPopularProducts() {
    return this.productsRepository.getPopularProducts();
  }

  getManufacturers() {
    return this.productsRepository.getManufacturers();
  }

  findOne(id: number) {
    return this.productsRepository.getOneById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  find() {
    return this.productsRepository.find({});
  }
}
