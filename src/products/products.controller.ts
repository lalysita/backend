import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductsDto } from './dto/products.dto/products.dto';
import { UpdateProductsDto } from './dto/products.dto/updateProducts.dto';



@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductsDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductsDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Put(':id')
  replace(@Param('id') id: string, @Body() createProductDto: CreateProductsDto) {
    return this.productsService.put(+id, createProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}