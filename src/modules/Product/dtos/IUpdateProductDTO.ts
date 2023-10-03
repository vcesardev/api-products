import { PartialType } from '@nestjs/mapped-types';
import { ICreateProductDTO } from './ICreateProductDTO';

export class IUpdateProductDTO extends PartialType(ICreateProductDTO) {
  updatedAt: Date;
}
