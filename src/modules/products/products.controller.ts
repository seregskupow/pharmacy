import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { GetProductsQuery } from './dto/find-products.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @UsePipes(new ValidationPipe({ transform: true }))
  @Get()
  findMany(@Query() queryParams: GetProductsQuery) {
    const { category, page, search, manufacturers, price } = queryParams;
    return this.productsService.findMany(
      category || null,
      search || null,
      page || 0,
      price || null,
      manufacturers || null,
    );
  }

  @Get('popular')
  getPopular() {
    return this.productsService.getPopularProducts();
  }

  @Get('manufacturers')
  getManufacturers() {
    return this.productsService.getManufacturers();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Get('category/:id')
  findByCategory(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
