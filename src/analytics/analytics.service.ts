import { Injectable } from '@nestjs/common';
import { Analytics } from './entities/analytics.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { AnalyticsAction } from 'src/interface/analytics.interface';
import { CellService } from '../cell/cell.service';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Analytics)
    private analyticsRepository: Repository<Analytics>,
    private cellService: CellService,
  ) {}

  async createAction(actionData: AnalyticsAction): Promise<Analytics> {
    const { targetId } = actionData;
    const existingCell = await this.cellService.findOneById(targetId);

    const analyticsRecord = new Analytics(actionData);
    analyticsRecord.cell = existingCell;
    return await this.analyticsRepository.save(analyticsRecord);
  }

  async getStatistics() {
    return await this.analyticsRepository.find();
  }
}
