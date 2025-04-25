import { Module } from '@nestjs/common';
import { SizeService } from './size.service';
import { SizeController } from './size.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsModule } from 'src/products/products.module';
import { Size } from './entities/size.entity';
import { Product } from 'src/products/entitys/entity.product';

@Module({
  imports: [
          TypeOrmModule.forFeature([Size, Product]), 
          ProductsModule                    
        ],
  controllers: [SizeController],
  providers: [SizeService],
})
export class SizeModule {}