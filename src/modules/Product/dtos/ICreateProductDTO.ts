import { IsString } from 'class-validator';

export class ICreateProductDTO {
  @IsString()
  name: string;
}
