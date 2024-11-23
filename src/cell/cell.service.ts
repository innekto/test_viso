import { Injectable } from '@nestjs/common';
import { Columns } from 'src/column/entities/column.entity';
import { RowEntity } from 'src/row-entity/entities/row-entity.entity';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import { Cell } from './entities/cell.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CellService {
  constructor(
    @InjectRepository(Cell)
    private cellRepository: Repository<Cell>,
  ) {}
  async create(
    newSheet: Sheet,
    newRow: RowEntity,
    newColumn: Columns,
    value: string,
  ) {
    const newCell = new Cell(value);
    newCell.column = newColumn;
    newCell.row = newRow;
    newCell.sheet = newSheet;
    return await this.cellRepository.save(newCell);
  }

  async findOne(row: number, column: string, sheetId: number) {
    const cell = await this.cellRepository
      .createQueryBuilder('cell')
      .innerJoinAndSelect('cell.row', 'row')
      .innerJoinAndSelect('cell.column', 'column')
      .innerJoinAndSelect('cell.sheet', 'sheet')
      .where('row.value = :row', { row })
      .andWhere('column.name = :columnName', { columnName: column })
      .andWhere('sheet.gid = :sheetId', { sheetId })
      .getOne();

    return cell;
  }

  async save(cell: Cell) {
    return await this.cellRepository.save(cell);
  }
}
