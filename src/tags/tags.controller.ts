import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TagDto } from './dto/tag.dto/tag.dto';
import { Tag } from './tag/tag.interface';
import { TagsService } from './tags.service';

@Controller('tags')
export class TagsController {
    constructor(private readonly tagService: TagsService){}

    @Get('slug/:slug')
    async findBySlug(@Param('slug') slug: string): Promise<Tag> {
        return this.tagService.getBySlug(slug);
    }

    
    
    //uso get en errores personalizados
    @Get(':id')
    async find(@Param('id') id: string) {
        console.log(id, typeof id);
        return this.tagService.getId(id)
    } 
    
    //Uso de ValidacionPipe por ruta
    @Post()
    @UsePipes(new ValidationPipe())
    post(@Body()body: TagDto): Promise<Tag>{
        return this.tagService.insert(body);
    }

    @Get()
    async findAll(): Promise<Tag[]> {
      return this.tagService.getAll();
    }
  
    @Put(':id')
    @UsePipes(new ValidationPipe())
    async update(@Param('id') id: string, @Body() body: TagDto): Promise<Tag> {
      return this.tagService.update(id, body);
    }
  
    @Patch(':id')
    async patch(@Param('id') id: string, @Body() partialBody: Partial<TagDto>): Promise<Tag> {
      return this.tagService.patch(id, partialBody);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<{ message: string }> {
      await this.tagService.delete(id);
      return { message: `Tag with id ${id} deleted successfully.`};
    }
}