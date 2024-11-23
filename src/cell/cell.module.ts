import { Module } from '@nestjs/common';
import { CellService } from './cell.service';
import { Cell } from './entities/cell.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Cell])],
  controllers: [],
  providers: [CellService],
})
export class CellModule {}
