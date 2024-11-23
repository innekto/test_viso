import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptionst } from './database/database-config';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptionst)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
