import { Controller, Post, Body } from '@nestjs/common';
import { WebhookService } from './webhook.service';
import { WebhookDataDto } from './dto/webhook.dto';

@Controller('webhook')
export class WebhookController {
  constructor(private readonly webhookService: WebhookService) {}

  @Post()
  async handleWebhook(@Body() rowData: WebhookDataDto) {
    await this.webhookService.handleWebhook(rowData);
  }
}
