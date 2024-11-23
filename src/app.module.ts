import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptionst } from './database/database-config';
import { RowEntityModule } from './row-entity/row-entity.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { NotFoundInterceptor } from './interceptors';
import { AppLoggerMiddleware } from './middlewares';
import { WebhookModule } from './webhook/webhook.module';
import { SheetModule } from './sheet/sheet.module';
import { ColumnModule } from './column/column.module';
import { CellModule } from './cell/cell.module';
import { MailModule } from './mail/mail.module';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptionst),
    RowEntityModule,

    WebhookModule,
    SheetModule,
    ColumnModule,
    CellModule,
    MailModule,
    AnalyticsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: NotFoundInterceptor,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
