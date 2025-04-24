import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ProductsModule } from 'src/products/products.module';
import { Product } from 'src/products/entitys/entity.product';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Product]), 
    ProductsModule           
  ],
  providers: [ UsersService ],
  controllers: [ UsersController ],
  exports: [ UsersService ],
})
export class UsersModule {}