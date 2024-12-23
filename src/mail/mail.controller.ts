import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateMailDto } from './dto/create-mail.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Mail } from './entities/mail.entity';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'add new email' })
  async create(@Body() createMailDto: CreateMailDto): Promise<Mail> {
    return await this.mailService.create(createMailDto);
  }
}
