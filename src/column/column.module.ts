import { Module } from '@nestjs/common';
import { ColumnService } from './column.service';
import { Columns } from './entities/column.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Columns])],
  controllers: [],
  providers: [ColumnService],
})
export class ColumnModule {}
