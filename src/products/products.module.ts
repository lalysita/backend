import { Module } from '@nestjs/common';
import {ProductsService} from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { Size } from '../size/entities/size.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entitys/entity.product';

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Size, User]), 
      
      ],
    controllers: [ProductsController],
    providers: [ProductsService]
})
export class ProductsModule {}