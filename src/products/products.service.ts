import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductsDto } from './dto/products.dto/products.dto';
import { Size } from 'src/size/entities/size.entity';
import { User } from 'src/users/entities/user.entity';
import { Product } from './entitys/entity.product';
import { UpdateProductsDto } from './dto/products.dto/updateProducts.dto';




@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  private async validateUser(userId: number): Promise<User> {
    if (!userId || typeof userId !== 'number') {
      throw new BadRequestException('ID de usuario inválido');
    }

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  private async findOrCreateSizes(sizeNames: string[]): Promise<Size[]> {
    const sizes: Size[] = [];

    for (const sizeName of sizeNames) {
      let size = await this.sizeRepository.findOne({ where: { size: sizeName } });

      if (!size) {
        size = this.sizeRepository.create({ size: sizeName });
        await this.sizeRepository.save(size);
      }

      sizes.push(size);
    }

    return sizes;
  }

  private validateProductData(dto: CreateProductsDto | UpdateProductsDto): void {
    if (!dto.name || typeof dto.name !== 'string') {
      throw new BadRequestException('Nombre del producto inválido');
    }
  }

  async create(dto: CreateProductsDto): Promise<Product> {
    this.validateProductData(dto);
    const user = await this.validateUser(dto.userId);
    const sizeNames = (dto as any).sizes || [];
    const sizes = await this.findOrCreateSizes(sizeNames);

    const product = this.productRepository.create({
      ...dto,
      user,
      sizes,
    });

    return this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['user', 'sizes'] });
  }

  async findOne(id: number): Promise<Product> {
    if (!id || isNaN(id)) {
      throw new BadRequestException('ID inválido');
    }

    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['user', 'sizes'],
    });

    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    }

    return product;
  }

  async update(id: number, dto: UpdateProductsDto): Promise<Product> {
    const product = await this.findOne(id);

    if (dto.name !== undefined || dto.price !== undefined) {
      this.validateProductData(dto);
    }

    if (dto.userId !== undefined && dto.userId !== product.user.id) {
      const user = await this.validateUser(dto.userId);
      product.user = user;
    }

    const sizeNames = (dto as any).sizes;
    const sizes = sizeNames ? await this.findOrCreateSizes(sizeNames) : product.sizes;

    const { userId, sizes: _, ...rest } = dto;
    Object.assign(product, rest);
    product.sizes = sizes;

    return this.productRepository.save(product);
  }

  async put(id: number, dto: CreateProductsDto): Promise<Product> {
    await this.findOne(id);

    this.validateProductData(dto);
    const user = await this.validateUser(dto.userId);
    const sizeNames = (dto as any).sizes || [];
    const sizes = await this.findOrCreateSizes(sizeNames);

    const updated = this.productRepository.create({
      ...dto,
      id,
      user,
      sizes,
    });

    return this.productRepository.save(updated);
  }

  async remove(id: number): Promise<{ message: string }> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
    return { message: 'Producto eliminado correctamente' };
  }
}