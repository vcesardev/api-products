import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './modules/Product/product.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ProductModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

