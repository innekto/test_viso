import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { Analytics } from './entities/analytics.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CellService } from 'src/cell/cell.service';
import { Cell } from 'src/cell/entities/cell.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Analytics, Cell])],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, CellService],
})
export class AnalyticsModule {}
