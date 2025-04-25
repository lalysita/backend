import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SizeService } from './size.service';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Controller('sizes')
export class SizeController {
  constructor(private readonly sizeService: SizeService) {}

  @Post()
  async create(@Body() createSizeDto: CreateSizeDto) {
    return await this.sizeService.create(createSizeDto);
  }

  @Get('equivalents')
  getEquivalents(
    @Query('size') size: string,
    @Query('type') type: 'hombre' | 'mujer' | 'niño',
  ) {
    return this.sizeService.getEquivalents(size, type);
  }

  @Get()
  async findAll() {
    return await this.sizeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.sizeService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSizeDto: UpdateSizeDto) {
    return await this.sizeService.update(+id, updateSizeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.sizeService.remove(+id);
    return { message: `Size with ID ${id} has been deleted successfully.`};
  }
}