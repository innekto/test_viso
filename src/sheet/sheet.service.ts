import { Injectable } from '@nestjs/common';

import { Sheet } from './entities/sheet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { WebhookDataDto } from 'src/webhook/dto/webhook.dto';
import { RowEntityService } from '../row-entity/row-entity.service';
import { ColumnService } from 'src/column/column.service';

import { CellService } from '../cell/cell.service';
import { MailerService } from 'src/mailer/mailer.service';
import { MailService } from 'src/mail/mail.service';
import { AnalyticsService } from '../analytics/analytics.service';
import { AnalyticsAction } from 'src/interface/analytics.interface';

@Injectable()
export class SheetService {
  constructor(
    @InjectRepository(Sheet)
    private sheetRepository: Repository<Sheet>,
    private rowService: RowEntityService,
    private columnService: ColumnService,
    private cellService: CellService,
    private mailerService: MailerService,
    private emailService: MailService,
    private analyticsService: AnalyticsService,
    private datasource: DataSource,
  ) {}

  async updateSheet(payload: WebhookDataDto) {
    const { sheetId, sheetName, row, column, newValue } = payload;

    const existingSheet = await this.sheetRepository.findOneBy({
      gid: sheetId,
    });

    if (!existingSheet) {
      const newSheet = new Sheet();
      newSheet.gid = sheetId;
      newSheet.name = sheetName;

      const savedSheet = await this.sheetRepository.save(newSheet);

      const newRow = await this.rowService.create(row, savedSheet);

      const newColumn = await this.columnService.create(column, savedSheet);

      const savedCell = await this.cellService.create(
        savedSheet,
        newRow,
        newColumn,
        newValue,
      );

      await this.createAnalytic({
        action: 'create',
        targetId: savedCell.id,
        oldValue: null,
        newValue: savedCell.value,
      });
    }

    if (existingSheet && existingSheet.name !== sheetName) {
      existingSheet.name = sheetName;
      await this.sheetRepository.save(existingSheet);
    }

    const existingCell = await this.cellService.findOne(row, column, sheetId);
    let response: any;

    if (!existingCell) {
      const existingRow = await this.rowService.findOneBySheet(row, sheetId);
      const existingColumn = await this.columnService.findOneBySheet(
        column,
        sheetId,
      );

      const cellRow = existingRow
        ? existingRow
        : await this.rowService.create(row, existingSheet);

      const cellColumn = existingColumn
        ? existingColumn
        : await this.columnService.create(column, existingSheet);

      response = await this.cellService.create(
        existingSheet,
        cellRow,
        cellColumn,
        newValue,
      );

      await this.createAnalytic({
        action: 'create',
        targetId: response.id,
        oldValue: null,
        newValue,
      });
    } else {
      await this.createAnalytic({
        action: 'update',
        targetId: existingCell.id,
        oldValue: existingCell.value,
        newValue: newValue,
      });

      existingCell.value = newValue || null;
      response = await this.cellService.save(existingCell);
    }
    const rowCount = await this.rowService.count();
    if (rowCount % 10 === 0) {
      const emails = (await this.emailService.findAll()).map(
        (email) => email.email,
      );
      await Promise.all(
        emails.map(async (email) => {
          await this.mailerService.sendTableInfo(email);
        }),
      );
    }

    return response;
  }

  private async createAnalytic(payload: AnalyticsAction) {
    const { action, targetId, oldValue, newValue } = payload;
    await this.analyticsService.createAction({
      action,
      targetId,
      oldValue,
      newValue,
    });
  }
}
