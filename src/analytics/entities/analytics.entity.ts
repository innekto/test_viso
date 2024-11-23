import { Cell } from 'src/cell/entities/cell.entity';
import { AnalyticsAction } from 'src/interface/analytics.interface';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Analytics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  action: string;

  @Column({ nullable: true })
  oldValue: string;

  @Column({ nullable: true })
  newValue: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Cell, (cell) => cell.analytics, { eager: true })
  cell: Cell;

  constructor(payload?: AnalyticsAction) {
    if (!payload) return;
    this.action = payload.action;
    this.newValue = payload.newValue || null;
    this.oldValue = payload.oldValue || null;
  }
}
