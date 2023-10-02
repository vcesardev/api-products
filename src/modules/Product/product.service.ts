import { Injectable } from '@nestjs/common';
import { ICreateComponentDTO } from './dtos/ICreateComponentDTO';

@Injectable()
export class ProductService {
  async listProducts() {
    return 'products listing';
  }

  async findProduct(id: string) {
    return `product ${id}`;
  }

  async createProduct(id: string) {
    return 'product created';
  }

  async findComponent(id: string, index: string) {
    return `component ${id} - ${index}`;
  }

  async createComponent(data: ICreateComponentDTO) {
    return data;
  }

  async listProductComponents(id: string) {
    return `list components from product ${id}`;
  }

  async findComponentByDescription(description: string) {
    return `component: ${description}`;
  }
}
