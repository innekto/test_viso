import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import { RowEntity } from 'src/row-entity/entities/row-entity.entity';

import { Columns } from 'src/column/entities/column.entity';

@Entity('cells')
export class Cell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  value: string;

  @ManyToOne(() => RowEntity, (row) => row.cells)
  row: RowEntity;

  @ManyToOne(() => Columns, (columns) => columns.cells)
  column: Columns;

  @ManyToOne(() => Sheet, (sheet) => sheet.cells)
  sheet: Sheet;

  constructor(payload?: string) {
    if (!payload) return;
    this.value = payload;
  }
}
