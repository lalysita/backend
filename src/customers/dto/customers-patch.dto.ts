import{ PartialType } from '@nestjs/mapped-types'
import { CustomersDto } from './customers.dto';

export class CustomersPatchDto extends PartialType(CustomersDto){

}
