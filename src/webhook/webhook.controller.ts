import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookDataDto } from './dto/webhook.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  @ApiOperation({ summary: 'ONLY FOR GOOGLE APPSCRIPT' })
  async handleWebhook(@Body() rowData: WebhookDataDto) {
    await this.webhookService.handleWebhook(rowData);
  }
}
