import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import { RowEntity } from 'src/row-entity/entities/row-entity.entity';

import { Columns } from 'src/column/entities/column.entity';
import { Analytics } from 'src/analytics/entities/analytics.entity';

@Entity('cells')
export class Cell {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  value: string;

  @ManyToOne(() => RowEntity, (row) => row.cells, { eager: true })
  row: RowEntity;

  @ManyToOne(() => Columns, (columns) => columns.cells, { eager: true })
  column: Columns;

  @ManyToOne(() => Sheet, (sheet) => sheet.cells, { eager: true })
  sheet: Sheet;

  @OneToMany(() => Analytics, (analytics) => analytics.cell)
  analytics: Analytics[];

  constructor(payload?: string) {
    if (!payload) return;
    this.value = payload;
  }
}
