import { IsNotEmpty } from "class-validator";

export class CreateProductsDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    stock: number;
}
