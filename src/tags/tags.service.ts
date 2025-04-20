import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Tag } from './tag/tag.interface';
import { TagDto } from './dto/tag.dto/tag.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class TagsService {
  private tags: Tag[] = [];

  getAll(): Tag[] {
    return this.tags;
  }

  getId(id: string): Tag {
    const tag = this.tags.find(tag => tag.id === id);
    if (!tag) {
      throw new NotFoundException(`Tag con id ${id} no encontrado`);
    }
    return tag;
  }

  getBySlug(slug: string): Tag {
    const tag = this.tags.find(tag => tag.slug === slug);
    if (!tag) {
      throw new NotFoundException(`Tag con slug "${slug}" no encontrado`);
    }
    return tag;
  }

  generarSlug(texto: string): string {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // quita acentos
      .replace(/[^a-z0-9\s-]/g, '')    // quita caracteres especiales
      .trim()
      .replace(/\s+/g, '-');           // espacios por guiones
  }

  async insert(tagDto: TagDto): Promise<Tag> {
    const slug = tagDto.slug ? this.generarSlug(tagDto.slug) : this.generarSlug(tagDto.name);

    const slugExiste = this.tags.some(tag => tag.slug === slug);
    if (slugExiste) {
      throw new BadRequestException(`El slug "${slug}" ya está en uso`);
    }

    const tag: Tag = {
      id: uuidv4(),
      name: tagDto.name,
      description: tagDto.description,
      stock: tagDto.stock,
      slug,
    };

    this.tags.push(tag);
    return tag;
  }

  async update(id: string, tagDto: TagDto): Promise<Tag> {
    const index = this.tags.findIndex(tag => tag.id === id);
    if (index === -1) {
      throw new NotFoundException(`Tag con id ${id} no encontrado`);
    }

    const nuevoSlug = tagDto.slug ? this.generarSlug(tagDto.slug) : this.generarSlug(tagDto.name);

    const slugEnUso = this.tags.some(tag => tag.slug === nuevoSlug && tag.id !== id);
    if (slugEnUso) {
      throw new BadRequestException(`El slug "${nuevoSlug}" ya está en uso`);
    }

    const updatedTag: Tag = {
      id,
      name: tagDto.name,
      description: tagDto.description,
      stock: tagDto.stock,
      slug: nuevoSlug,
    };

    this.tags[index] = updatedTag;
    return updatedTag;
  }

  async patch(id: string, partialDto: Partial<TagDto>): Promise<Tag> {
    const tag = this.getId(id);

    const nuevoSlug = partialDto.slug
      ? this.generarSlug(partialDto.slug)
      : partialDto.name
      ? this.generarSlug(partialDto.name)
      : tag.slug;

    const slugEnUso = this.tags.some(t => t.slug === nuevoSlug && t.id !== id);
    if (slugEnUso) {
      throw new BadRequestException(`El slug "${nuevoSlug}" ya está en uso`);
    }

    const updatedTag: Tag = {
      ...tag,
      ...partialDto,
      slug: nuevoSlug,
    };

    const index = this.tags.findIndex(t => t.id === id);
    this.tags[index] = updatedTag;

    return updatedTag;
  }

  async delete(id: string): Promise<void> {
    const index = this.tags.findIndex(tag => tag.id === id);
    if (index === -1) {
      throw new NotFoundException(`Tag con id ${id} no encontrado`);
    }
    this.tags.splice(index, 1);
  }
}