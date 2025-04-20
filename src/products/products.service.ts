import { Injectable } from '@nestjs/common';
import { Product } from './interface/product/product.interface';

@Injectable()
export class ProductsService {
    private products: Product[] = [
        {
            id: 0,
            name: 'Vela aromática',
            description: 'Esta vela olor a rosas',
          },
          {
            id: 1,
            name: 'Marco de fotos pequeño',
            description: 'Marco ideal para fotos 10x15',
          },
          {
            id: 2,
            name: 'Marco de fotos mediano',
            description: 'Marco ideal para fotos 20x25',
          },
          {
            id: 3,
            name: 'Marco de fotos grande',
            description: 'Marco ideal para fotos 40x30',
          },
          {
            id: 4,
            name: 'Marco de fotos grande',
            description: 'Marco ideal para fotos 40x30',
          }
    ];

    getAll(): Product[] {
        return this.products;
    }

    //READ
    getId(id:number) {
        return this.products.find( (item: Product) => item.id == id);
    }

    //CREATE
    insert(body: any) {
        this.products = [
            ...this.products,
            {
                id: this.lastId() + 1,
                name: body.name,
                description: body.descripcion,
            }
        ]
    }
 
    //UPDATE
    update(id: number, body: any) {
        let product: Product = {
          id,
          name: body.name,
          description: body.description,
        }
        this.products = this.products.map( (item: Product) => {
          console.log(item, id, item.id == id);
          return item.id == id ? product : item;
        });
    }

    //DELETE
    delete(id: number) {
        this.products = this.products.filter( (item: Product) => item.id != id );
    }
    
    private lastId(): number {
        return this.products[this.products.length -1].id;
    }
}

