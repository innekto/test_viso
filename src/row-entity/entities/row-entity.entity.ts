import { Cell } from 'src/cell/entities/cell.entity';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity('row')
export class RowEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @OneToMany(() => Cell, (cell) => cell.row)
  cells: Cell[];

  @ManyToOne(() => Sheet, (sheet) => sheet.rows)
  sheet: Sheet;

  constructor(payload?: number) {
    if (!payload) return;

    this.value = payload;
  }
}
