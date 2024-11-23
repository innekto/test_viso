import { Injectable, NotFoundException } from '@nestjs/common';
import { RowEntity } from './entities/row-entity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RowEntityService {
  constructor(
    @InjectRepository(RowEntity)
    private rowRepository: Repository<RowEntity>,
    private redisService: RedisService,
  ) {}

  async create(payload: number, sheet: Sheet) {
    const newRow = new RowEntity(payload);
    newRow.sheet = sheet;
    return await this.rowRepository.save(newRow);
  }

  async findAll() {
    const rows = await this.rowRepository
      .createQueryBuilder('row')
      .leftJoinAndSelect('row.cells', 'cell')
      .leftJoinAndSelect('cell.column', 'column')
      .leftJoinAndSelect('cell.sheet', 'sheet')
      .getMany();

    if (!rows.length) {
      throw new NotFoundException('No rows found');
    }

    const result = rows.map((row) => {
      const sheet = row.cells?.[0]?.sheet;
      const columnValues = row.cells.map((cell) => ({
        columnName: cell.column.name,
        value: cell.value,
      }));

      return {
        rowValue: row.value,
        sheetName: sheet?.name,
        columns: columnValues,
      };
    });

    return result.sort((a, b) => a.rowValue - b.rowValue);
  }

  async findOne(rowId: number) {
    const cachedRow = await this.redisService.getCache(`row:${rowId}`);
    if (cachedRow) {
      const response = JSON.parse(cachedRow);
      return response;
    }

    const row = await this.rowRepository
      .createQueryBuilder('row')
      .leftJoinAndSelect('row.cells', 'cell')
      .leftJoinAndSelect('cell.column', 'column')
      .leftJoinAndSelect('cell.sheet', 'sheet')
      .where('row.id = :rowId', { rowId })
      .getOne();

    if (!row) {
      throw new NotFoundException(`Row with id ${rowId} not found`);
    }

    const sheet = row.cells?.[0]?.sheet;
    const columnValues = row.cells.map((cell) => ({
      columnName: cell.column.name,
      value: cell.value,
    }));

    const result = {
      rowValue: row.value,
      sheetName: sheet?.name,
      columns: columnValues,
    };

    await this.redisService.setCache(
      `row:${rowId}`,
      JSON.stringify(result),
      3600,
    );

    return result;
  }

  async findOneBySheet(row: number, sheetId: number) {
    return await this.rowRepository.findOne({
      where: { value: row, sheet: { gid: sheetId } },
    });
  }
  async count() {
    return await this.rowRepository.count();
  }
}
