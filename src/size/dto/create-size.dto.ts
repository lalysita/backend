import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSizeDto {
    @IsNotEmpty({ message: 'El tamaño no puede estar vacío' })
    @IsString({ message: 'El tamaño debe ser una cadena de texto' })
    @Length(1, 50, { message: 'El tamaño debe tener entre 1 y 50 caracteres' })
    size: string;
}