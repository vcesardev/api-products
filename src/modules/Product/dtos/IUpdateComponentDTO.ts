import { PartialType } from '@nestjs/mapped-types';
import { ICreateComponentDTO } from './ICreateComponentDTO';

export class IUpdateProductDTO extends PartialType(ICreateComponentDTO) {
  updatedAt: Date;
}
