import { Module } from '@nestjs/common';
import { RowEntityService } from './row-entity.service';
import { RowEntityController } from './row-entity.controller';
import { RowEntity } from './entities/row-entity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RowEntity])],
  controllers: [RowEntityController],
  providers: [RowEntityService],
})
export class RowEntityModule {}
