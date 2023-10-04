import { PartialType } from '@nestjs/mapped-types';
import { ICreateComponentDTO } from './ICreateComponentDTO';

export class IUpdateComponentDTO extends PartialType(ICreateComponentDTO) {
  updatedAt: Date;
}
