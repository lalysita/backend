import { IsNotEmpty } from "class-validator";

export class ProductsDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    description: string;
    @IsNotEmpty()
    stock: number;
}
