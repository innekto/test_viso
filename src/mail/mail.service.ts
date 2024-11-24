import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';

import { Mail } from './entities/mail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MailService {
  constructor(
    @InjectRepository(Mail)
    private mailRepository: Repository<Mail>,
  ) {}

  async create(payload: CreateMailDto): Promise<Mail> {
    const exist = await this.mailRepository.findOneBy({
      email: payload.email,
    });

    if (exist) {
      throw new BadRequestException('Email already exist');
    }
    const newEmail = new Mail(payload);
    return await this.mailRepository.save(newEmail);
  }

  async findAll() {
    return await this.mailRepository.find();
  }
}
