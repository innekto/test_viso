import { Cell } from 'src/cell/entities/cell.entity';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Columns {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Cell, (cell) => cell.row)
  cells: Cell[];

  @ManyToOne(() => Sheet, (sheet) => sheet.columns)
  sheet: Sheet;

  constructor(payload?: string) {
    if (!payload) return;

    this.name = payload;
  }
}
