import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [ProductController],
  imports: [PrismaModule],
  providers: [ProductService],
})
export class ProductModule {}
