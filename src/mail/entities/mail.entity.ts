import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateMailDto } from '../dto/create-mail.dto';

@Entity()
export class Mail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  constructor(payload?: CreateMailDto) {
    if (!payload) return;
    this.email = payload.email;
  }
}
