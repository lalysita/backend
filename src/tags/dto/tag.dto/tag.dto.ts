import { IsInt, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class TagDto {
  @IsString()
  @MinLength(1)
  @MaxLength(30)
  @Matches(
    /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/,
    { message: 'El nombre solo debe contener letras y espacios' }
  )
  name: string;

  @IsString()
  @MinLength(1)
  @MaxLength(100)
  description: string;

  @IsOptional()
  @IsString()
  @Matches(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    { message: 'El slug solo debe contener letras minúsculas, números y guiones' }
  )
  slug?: string;

  @IsInt({ message: 'El stock debe ser un número entero' })
  stock: number;
}