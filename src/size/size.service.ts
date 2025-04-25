import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Size } from './entities/size.entity';
import { CreateSizeDto } from './dto/create-size.dto';
import { UpdateSizeDto } from './dto/update-size.dto';

@Injectable()
export class SizeService {
  constructor(
    @InjectRepository(Size)
    private readonly sizeRepository: Repository<Size>,
  ) {}

  private readonly sizeEquivalents = {
    hombre: {
      CH: { region: 'LATAM', USA: 'S', EU: '46' },
      M: { region: 'USA', LATAM: 'M', EU: '48' },
      G: { region: 'LATAM', USA: 'L', EU: '50' },
      L: { region: 'USA', LATAM: 'G', EU: '50' },
      XL: { region: 'USA', LATAM: 'EG', EU: '52' },
      EG: { region: 'LATAM', USA: 'XL', EU: '52' },
      XXL: { region: 'USA', LATAM: 'EEG', EU: '54' },
      EEG: { region: 'LATAM', USA: 'XXL', EU: '54' },
    },
    mujer: {
      CH: { region: 'LATAM', USA: 'XS', EU: '34' },
      XS: { region: 'USA', LATAM: 'CH', EU: '34' },
      S: { region: 'USA', LATAM: 'M', EU: '36' },
      M: { region: 'USA', LATAM: 'G', EU: '38' },
      G: { region: 'LATAM', USA: 'M', EU: '38' },
      L: { region: 'USA', LATAM: 'EG', EU: '40' },
      EG: { region: 'LATAM', USA: 'L', EU: '40' },
      XL: { region: 'USA', LATAM: 'EEG', EU: '42' },
      EEG: { region: 'LATAM', USA: 'XL', EU: '42' },
    },
    niño: {
      4: { region: 'LATAM', USA: '4T', EU: '104' },
      6: { region: 'LATAM', USA: '6', EU: '116' },
      8: { region: 'LATAM', USA: '8', EU: '128' },
      10: { region: 'LATAM', USA: '10', EU: '140' },
      12: { region: 'LATAM', USA: '12', EU: '152' },
      14: { region: 'LATAM', USA: '14', EU: '164' },
      16: { region: 'LATAM', USA: '16', EU: '170' },
    },
  };

  async create(createSizeDto: CreateSizeDto): Promise<Size> {
    const size = this.sizeRepository.create(createSizeDto);
    return this.sizeRepository.save(size);
  }

  async findAll(): Promise<Size[]> {
    return this.sizeRepository.find({ relations: ['products'] });
  }

  async findOne(id: number): Promise<Size> {
    return this.sizeRepository.findOneOrFail({ where: { id }, relations: ['products'] });
  }

  async update(id: number, updateSizeDto: UpdateSizeDto): Promise<Size> {
    await this.sizeRepository.update(id, updateSizeDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.sizeRepository.delete(id);
  }

  /**
   * Busca tallas por nombre o ID
   */
  async getSizesByNames(names: (string | number)[]): Promise<Size[]> {
    const sizeStrings = names.map(n => n.toString());
    return this.sizeRepository.find({ where: { size: In(sizeStrings) } });
  }

 
  getEquivalents(size: string, tipo: 'hombre' | 'mujer' | 'niño') {
    const equivalencias = this.sizeEquivalents[tipo];
    const result = equivalencias?.[size];

    if (!result) {
      return { message: `No se encontró equivalencia para la talla "${size}" en el tipo "${tipo}"` };
    }

    return {
      origen: size,
      region: result.region,
      equivalencias: {
        LATAM: result.LATAM,
        USA: result.USA,
        EU: result.EU,
      },
    };
  }

  
  mapSizesWithEquivalences(sizes: Size[]) {
    return sizes.map(size => {
      let match: any;
      let tipoUsuario: string | null = null;

      for (const tipo in this.sizeEquivalents) {
        if (this.sizeEquivalents[tipo][size.size]) {
          match = this.sizeEquivalents[tipo][size.size];
          tipoUsuario = tipo;
          break;
        }
      }

      return {
        original: size.size,
        region: match?.region || 'desconocido',
        tipoUsuario: tipoUsuario || 'desconocido',
        equivalencias: match
          ? Object.entries(match).reduce((acc, [region, value]) => {
              if (region !== 'region') acc[region] = value;
              return acc;
            }, {})
          : {},
      };
    });
  }
}