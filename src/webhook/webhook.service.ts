import { Injectable } from '@nestjs/common';
import { WebhookDataDto } from './dto/webhook.dto';
import { SheetService } from 'src/sheet/sheet.service';
import { WebSocketGatewayService } from 'src/websocket/socket.gateway';

@Injectable()
export class WebhookService {
  constructor(
    private sheetService: SheetService,
    private webSocketGateway: WebSocketGatewayService,
  ) {}

  async handleWebhook(payload: WebhookDataDto) {
    const response = await this.sheetService.updateSheet(payload);
    console.log('response :>> ', response);
    this.webSocketGateway.emitRowUpdate(response);
    return response;
  }
}
