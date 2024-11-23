import { Module } from '@nestjs/common';
import { RowEntityService } from './row-entity.service';
import { RowEntityController } from './row-entity.controller';
import { RowEntity } from './entities/row-entity.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisService } from 'src/redis/redis.service';

@Module({
  imports: [TypeOrmModule.forFeature([RowEntity])],
  controllers: [RowEntityController],
  providers: [RowEntityService, RedisService],
})
export class RowEntityModule {}
