import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Product } from 'src/products/entitys/entity.product';




@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,  
  ) {}

  findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['products'] });  
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['products'],  
    });

    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    
    const user = this.userRepository.create(createUserDto);

    if (createUserDto.productIds && createUserDto.productIds.length > 0) {
      const products = await this.productRepository.findByIds(createUserDto.productIds);  
      if (products.length !== createUserDto.productIds.length) {
        throw new NotFoundException('Uno o más productos no se encontraron');
      }

      user.products = products;  
    }

  
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }

    await this.userRepository.remove(user);
  }

  async updateComplete(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException(`Usuario con ID: ${id} no encontrado`);
    }

    user.name = updateUserDto.name ?? '';
    user.last_name = updateUserDto.last_name ?? '';
    user.descriptions = updateUserDto.descriptions ?? '';
    user.email = updateUserDto.email ?? '';
    user.birthday = updateUserDto.birthday ?? new Date();
    user.identificacion = updateUserDto.identificacion ?? 0;

    return await this.userRepository.save(user);
  }
}