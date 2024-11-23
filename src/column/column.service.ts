import { Injectable } from '@nestjs/common';
import { Columns } from './entities/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sheet } from 'src/sheet/entities/sheet.entity';

@Injectable()
export class ColumnService {
  constructor(
    @InjectRepository(Columns)
    private columnRepository: Repository<Columns>,
  ) {}

  async create(payload: string, sheet: Sheet) {
    const newColumn = new Columns(payload);
    newColumn.sheet = sheet;
    return await this.columnRepository.save(newColumn);
  }

  async findOneBySheet(column: string, sheetId: number) {
    return await this.columnRepository.findOne({
      where: { name: column, sheet: { gid: sheetId } },
    });
  }
}
