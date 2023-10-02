import { Controller, Get, Post, Param, Body, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('api/v1/produto')
export class ProductController {
  constructor(private productService: ProductService) {}
  // list
  @Get()
  async list() {
    return this.productService.listProducts();
  }
  //    find
  @Get(':id')
  async find(@Param() params) {
    const { id } = params;
    return this.productService.findProduct(id);
  }
  //   create
  @Post()
  async create(@Body() body) {
    return this.productService.createProduct(body);
  }

  //   find component
  @Get(':id/componente/:index')
  async listComponent(@Param() params) {
    const { id, index } = params;
    return this.productService.findComponent(id, index);
  }

  //   create components
  @Post(':id/componente')
  async createComponent(@Body() body) {
    return this.productService.createComponent(body);
  }

  //   list components in a prouct
  @Get(':id/componente')
  async listProductComponent(@Param() params) {
    const { id } = params;
    return this.productService.listProductComponents(id);
  }

  @Get('componente')
  async findComponent(@Query() query) {
    const { description } = query;

    return description;
  }
}
