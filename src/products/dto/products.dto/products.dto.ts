import { IsString, IsNotEmpty, IsInt, Min, MaxLength, IsPositive, IsOptional, IsArray, IsNumber } from 'class-validator';

export class CreateProductsDto {
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacío.' })
  @MaxLength(100, { message: 'El nombre no debe tener más de 100 caracteres.' })
  name: string;

  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'La descripción no puede estar vacía.' })
  @MaxLength(300, {
    message: 'La descripción no debe superar los 300 caracteres.',
  })
  description: string;

  @IsInt({ message: 'El stock debe ser un número entero.' })
  @Min(0, { message: 'El stock no puede ser negativo.' })
  stock: number;

  @IsNumber({}, { message: 'El precio debe ser un número.' })
  @IsPositive({ message: 'El precio debe ser un número positivo.' })
  price: number;

  @IsInt({ message: 'El ID de usuario debe ser un número entero.' })
  @IsPositive({ message: 'El ID de usuario debe ser un número positivo.' })
  userId: number;

  @IsOptional()
  @IsArray()
  sizes?: string[];

}