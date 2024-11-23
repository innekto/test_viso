import { Cell } from 'src/cell/entities/cell.entity';
import { Columns } from 'src/column/entities/column.entity';
import { RowEntity } from 'src/row-entity/entities/row-entity.entity';

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sheet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gid: number;

  @Column()
  name: string;

  @OneToMany(() => Cell, (cell) => cell.row)
  cells: Cell[];

  @OneToMany(() => Columns, (columns) => columns.sheet)
  columns: Columns[];

  @OneToMany(() => RowEntity, (row) => row.sheet)
  rows: RowEntity[];
}
