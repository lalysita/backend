import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    last_name: string;
    @IsNotEmpty()
    descriptions: string;
    @IsNotEmpty()
    email: string;
    @IsNotEmpty()
    birthday: Date;
    @IsNotEmpty()
    identificacion: number;
  }
  