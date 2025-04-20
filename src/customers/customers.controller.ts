import { Controller, Query, Get, ParseIntPipe, Param, Post, HttpCode, HttpStatus, Body, Put, Delete, Patch } from '@nestjs/common';
import {Customer} from './interface/customers/customer.interface';
import { CustomersService } from './customers.service';
import { CustomersDto } from './dto/customers.dto';
import { CustomersPatchDto } from './dto/customers-patch.dto';


@Controller('customers')
export class CustomersController {
    constructor(private readonly custumerService: CustomersService) {}

    //USAR QUERY
    @Get('query')
    rutaQuery(@Query() query) {
        return `El dato query.x ha recibido el valor ${query.x} y el valor de y es: ${query.y}`;
    }

    @Get('car')
    carQuery(@Query('count') carCount: number) {
        return `CarCount: ${carCount}`;
    }

    @Get('cars')
    carsQuery(@Query('count', ParseIntPipe) carCount: number) {
        return `CarCount: ${carCount}`;
    }

    @Get()
    getAllCustomers(): Customer[]{
        return this.custumerService.getCustomers();
    }

    @Get(':id')
    async find(@Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number) {
        return this.custumerService.getCustomersById(id);
        
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    createCustomer(
        @Body() customerDto: CustomersDto,
    ) {
        this.custumerService.insert(customerDto);
        return { message: 'Agregado correctamente'};
    }

    @Put(':id')
    async update(
        @Param('id', new ParseIntPipe({errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE})) id: number,
        @Body() body,
    ) {
        return this.custumerService.update(id, body);
    }

    @Patch(':id')
    async patch(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: CustomersPatchDto,
    ) {
        return this.custumerService.patch(+id, body);
}

    @Delete(':id')
    @HttpCode(HttpStatus.ACCEPTED)
    delete(@Param('id') id:number){
        this.custumerService.delete(id);
    }
}
