import { Module } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookController } from './webhook.controller';
import { SheetService } from 'src/sheet/sheet.service';
import { Sheet } from 'src/sheet/entities/sheet.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowEntity } from 'src/row-entity/entities/row-entity.entity';
import { RowEntityService } from 'src/row-entity/row-entity.service';
import { Columns } from 'src/column/entities/column.entity';
import { ColumnService } from 'src/column/column.service';
import { CellService } from 'src/cell/cell.service';
import { Cell } from 'src/cell/entities/cell.entity';
import { MailerService } from 'src/mailer/mailer.service';
import { MailService } from 'src/mail/mail.service';
import { Mail } from 'src/mail/entities/mail.entity';
import { WebSocketGatewayService } from 'src/websocket/socket.gateway';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sheet, RowEntity, Columns, Cell, Mail])],
  controllers: [WebhookController],
  providers: [
    WebhookService,
    SheetService,
    RowEntityService,
    ColumnService,
    CellService,
    MailerService,
    MailService,
    MailService,
    WebSocketGatewayService,
    RedisService,
  ],
})
export class WebhookModule {}
