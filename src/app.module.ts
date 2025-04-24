import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './products/products.controller';
import { CustomersController } from './customers/customers.controller';
import { UsersController } from './controllers/users/users.controller';
import { ProductsService } from './products/products.service';
import { CustomersService } from './customers/customers.service';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products/entitys/entity.product';
import { SizeModule } from './size/size.module';

@Module({
  imports: [ProductsModule, TagsModule,TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '12345',
    database: 'nestjs',
    entities:[User, Product],
    retryDelay:3000,
    autoLoadEntities:true,
    synchronize: true,
  }),UsersModule, SizeModule],
  controllers: [AppController, CustomersController, UsersController],
  providers: [AppService, CustomersService],
})
export class AppModule {
  
}
