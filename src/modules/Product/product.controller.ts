import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ICreateComponentDTO } from './dtos/ICreateComponentDTO';
import { ICreateProductDTO } from './dtos/ICreateProductDTO';
import { IUpdateProductDTO } from './dtos/IUpdateProductDTO';
import { IUpdateComponentDTO } from './dtos/IUpdateComponentDTO';

@Controller('api/v1/produto')
export class ProductController {
  constructor(private productService: ProductService) {}
  // list
  @Get()
  async list() {
    return this.productService.listProducts();
  }
  //    find
  @Get(':productCode')
  async find(@Param() params) {
    const { productCode } = params;
    return this.productService.findProduct(productCode);
  }
  //   create
  @Post()
  async create(@Body() body: ICreateProductDTO) {
    return this.productService.createProduct(body);
  }
  // edit product
  @Patch(':productCode')
  async edit(
    @Body() body: IUpdateProductDTO,
    @Param('productCode') productCode: string,
  ) {
    return this.productService.updateProduct(body, productCode);
  }
  // delete product
  @Delete(':productCode')
  async deleteProduct(@Param('id') productId: string) {
    return this.productService.deleteProduct(productId);
  }

  //  ------ component

  //   find component
  @Get(':productCode/componente/:componentIndex')
  async listComponent(@Param() params) {
    const { productCode, componentIndex } = params;
    return this.productService.findComponent(productCode, componentIndex);
  }

  //   create components
  @Post(':productCode/componente')
  async createComponent(@Param() params, @Body() body: ICreateComponentDTO) {
    const { productCode } = params;
    return this.productService.createComponent(body, productCode);
  }

  //   list components in a prouct
  @Get(':productCode/componente')
  async listProductComponent(@Param() params) {
    const { productCode } = params;
    return this.productService.listProductComponents(productCode);
  }

  @Get('/componente/filter')
  async findComponent(@Query('description') description: string) {
    return this.productService.findComponentByDescription(description);
  }

  @Patch('/componente/:componentIndex')
  async updateComponent(
    @Body() body: IUpdateComponentDTO,
    @Param('componentIndex') componentIndex: string,
  ) {
    return this.productService.updateComponent(body, componentIndex);
  }

  @Delete('/componente/:componentIndex')
  async deleteComponent(@Param('componentIndex') componentIndex: string) {
    return this.productService.deleteComponent(componentIndex);
  }
}
