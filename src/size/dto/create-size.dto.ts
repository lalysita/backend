import { IsNotEmpty, IsString, Length, IsEnum } from 'class-validator';

export class CreateSizeDto {
  @IsNotEmpty({ message: 'El tamaño no puede estar vacío' })
  @IsString({ message: 'El tamaño debe ser una cadena de texto' })
  @Length(1, 50, { message: 'El tamaño debe tener entre 1 y 50 caracteres' })
  size: string;

  @IsNotEmpty({ message: 'La región es obligatoria' })
  @IsEnum(['USA', 'EU', 'LATAM'], {
    message: 'La región debe ser una de las siguientes: USA, EU, LATAM',
  })
  region: 'USA' | 'EU' | 'LATAM';

  @IsNotEmpty({ message: 'El tipo es obligatorio' })
  @IsEnum(['hombre', 'mujer', 'niño'], {
    message: 'El tipo debe ser uno de los siguientes: hombre, mujer, niño',
  })
  type: 'hombre' | 'mujer' | 'niño';
}