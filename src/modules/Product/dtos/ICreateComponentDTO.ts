import { IsString, IsNumber } from 'class-validator';

export class ICreateComponentDTO {
  @IsString()
  code: string;

  @IsString()
  index: string;

  @IsString()
  sku: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsNumber()
  amount: number;
}
