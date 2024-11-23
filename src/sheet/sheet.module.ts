import { Module } from '@nestjs/common';
import { SheetService } from './sheet.service';
import { SheetController } from './sheet.controller';
import { Sheet } from './entities/sheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowEntity } from 'src/row-entity/entities/row-entity.entity';
import { RowEntityService } from 'src/row-entity/row-entity.service';
import { Columns } from 'src/column/entities/column.entity';
import { ColumnService } from 'src/column/column.service';
import { Cell } from 'src/cell/entities/cell.entity';
import { CellService } from 'src/cell/cell.service';
import { MailerService } from 'src/mailer/mailer.service';
import { MailService } from 'src/mail/mail.service';
import { Mail } from 'src/mail/entities/mail.entity';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sheet, RowEntity, Columns, Cell, Mail])],
  controllers: [SheetController],
  providers: [
    SheetService,
    RowEntityService,
    ColumnService,
    CellService,
    MailerService,
    MailService,
    RedisService,
  ],
})
export class SheetModule {}
