import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entitys/entity.product'; // Asegúrate de que la ruta esté correcta

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // READ ALL
  async getAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // READ by ID
  async getId(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) throw new NotFoundException(`Product with id ${id} not found`);
    return product;
  }

  // CREATE
  async insert(body: any): Promise<Product> {
    const product = this.productRepository.create({
      name: body.name,
      description: body.description, // Asegúrate de usar el campo correcto (description en lugar de descripcion)
      stock: body.stock,
    });
    return this.productRepository.save(product);
  }

  // UPDATE
  async update(id: number, body: any): Promise<Product> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Product not found'); // Aquí puedes lanzar un NotFoundException de NestJS si lo prefieres
    }

    product.name = body.name;
    product.description = body.description;
    product.stock = body.stock;

    return this.productRepository.save(product);
  }

  // DELETE
  async delete(id: number): Promise<void> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Product not found'); // O puedes usar un NotFoundException
    }
    await this.productRepository.remove(product);
  }
}
