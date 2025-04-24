import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {  
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {  
    return this.usersService.findOne(Number(id));
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {  
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {  
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<{ message: string }> {  
    await this.usersService.remove(+id);  
    return { message: `Usuario con ID: ${id} eliminado correctamente` };
  }

  @Put(':id')
  async updateComplete(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> { 
    return this.usersService.updateComplete(+id, updateUserDto);
  }
}