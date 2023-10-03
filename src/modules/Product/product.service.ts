import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ICreateComponentDTO } from './dtos/ICreateComponentDTO';
import { PrismaService } from '../prisma/prisma.service';
import { ICreateProductDTO } from './dtos/ICreateProductDTO';
import { IUpdateProductDTO } from './dtos/IUpdateProductDTO';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}
  async listProducts() {
    return this.prismaService.product.findMany({
      include: { components: true },
    });
  }

  async findProduct(id: string) {
    return this.prismaService.product.findFirst({
      where: { id: id },
      include: { components: true },
    });
  }

  async createProduct(data: ICreateProductDTO) {
    return this.prismaService.product.create({
      data: {
        ...data,
        id: uuidv4(),
      },
    });
  }

  async updateProduct(data: IUpdateProductDTO, productId: string) {
    return this.prismaService.product.update({
      where: { id: productId },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteProduct(productId: string) {
    return this.prismaService.product.delete({
      where: { id: productId },
    });
  }

  async findComponent(id: string, index: string) {
    return this.prismaService.product.findFirst({
      where: { id: id },
      select: { components: { where: { index: index } } },
    });
  }

  async createComponent(data: ICreateComponentDTO, productId: string) {
    return this.prismaService.component.create({
      data: {
        ...data,
        id: uuidv4(),
        product: { connect: { id: productId } },
      },
    });
  }

  async listProductComponents(id: string) {
    return this.prismaService.component.findMany({ where: { productId: id } });
  }

  async findComponentByDescription(description: string) {
    return this.prismaService.component.findMany({
      where: { description: { contains: description } },
    });
  }

  async updateComponent(data: IUpdateProductDTO, componentId: string) {
    return this.prismaService.component.update({
      where: { id: componentId },
      data: { ...data, updatedAt: new Date() },
    });
  }
}
