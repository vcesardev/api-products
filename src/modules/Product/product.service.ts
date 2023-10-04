import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { ICreateComponentDTO } from './dtos/ICreateComponentDTO';
import { PrismaService } from '../prisma/prisma.service';
import { ICreateProductDTO } from './dtos/ICreateProductDTO';
import { IUpdateProductDTO } from './dtos/IUpdateProductDTO';

@Injectable()
export class ProductService {
  constructor(private prismaService: PrismaService) {}

  async checkProductExists(productCode: string) {
    const item = await this.prismaService.product.findFirst({
      where: { code: productCode },
      include: { components: true },
    });

    if (!item) {
      throw new NotFoundException('Produto não encontrado.');
    }

    return item;
  }

  async checkComponentExists(componentIndex: string) {
    const item = await this.prismaService.component.findFirst({
      where: { index: componentIndex },
    });

    if (!item) {
      throw new NotFoundException('Componente não encontrado.');
    }

    return item;
  }

  async listProducts() {
    try {
      return this.prismaService.product.findMany({
        include: { components: true },
      });
    } catch (e) {
      throw new BadRequestException('Não foi possível realizar a solicitação.');
    }
  }

  async findProduct(code: string) {
    try {
      return await this.checkProductExists(code);
    } catch (e) {
      throw new NotFoundException(e.message);
    }
  }

  async createProduct(data: ICreateProductDTO) {
    try {
      const itemExists = await this.prismaService.product.findFirst({
        where: { code: data.code },
      });

      if (itemExists) {
        throw new BadRequestException('Um item com este código já existe.');
      }

      return this.prismaService.product.create({
        data: {
          ...data,
          id: uuidv4(),
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateProduct(data: IUpdateProductDTO, productCode: string) {
    try {
      await this.checkProductExists(productCode);

      const productAlreadyExists = await this.prismaService.product.findFirst({
        where: { code: data.code },
      });

      if (productAlreadyExists) {
        throw new BadRequestException('Um produto com este código já existe.');
      }

      return this.prismaService.product.update({
        where: { code: productCode },
        data: { ...data, updatedAt: new Date() },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteProduct(productCode: string) {
    try {
      await this.checkProductExists(productCode);
      return this.prismaService.product.delete({
        where: { id: productCode },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findComponent(productCode: string, componentIndex: string) {
    try {
      await this.checkProductExists(productCode);
      await this.checkComponentExists(componentIndex);

      return this.prismaService.product.findFirst({
        where: { code: productCode },
        select: { components: { where: { index: componentIndex } } },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async createComponent(data: ICreateComponentDTO, productCode: string) {
    try {
      await this.checkProductExists(productCode);
      const componentIndexExists = await this.prismaService.component.findFirst(
        {
          where: { index: data.index },
        },
      );

      const componentCodeExists = await this.prismaService.component.findFirst({
        where: { code: data.code },
      });

      if (componentIndexExists) {
        throw new BadRequestException(
          'Um componente com este índice já existe.',
        );
      }
      if (componentCodeExists) {
        throw new BadRequestException(
          'Um componente com este código já existe.',
        );
      }
      return this.prismaService.component.create({
        data: {
          ...data,
          id: uuidv4(),
          product: { connect: { code: productCode } },
        },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async listProductComponents(productCode: string) {
    try {
      await this.checkProductExists(productCode);
      return this.prismaService.component.findMany({
        where: { productCode: productCode },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async findComponentByDescription(description: string) {
    try {
      const itemsFound = await this.prismaService.component.findMany({
        where: { description: { contains: description } },
      });

      if (itemsFound.length < 1) {
        throw new NotFoundException(
          'Nenhum item com essa descrição foi encontrado.',
        );
      }

      return itemsFound;
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async updateComponent(data: IUpdateProductDTO, componentIndex: string) {
    console.log(componentIndex);
    await this.checkComponentExists(componentIndex);
    try {
      return this.prismaService.component.update({
        where: { index: componentIndex },
        data: { ...data, updatedAt: new Date() },
      });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async deleteComponent(componentIndex: string) {
    try {
      await this.checkComponentExists(componentIndex);
      return this.prismaService.component.delete({
        where: { index: componentIndex },
      });
    } catch (e) {
      throw new BadRequestException('Não foi possívelrealizar a solicitação.');
    }
  }
}
