import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';
import { Cell } from 'src/cell/entities/cell.entity';

@WebSocketGateway({ cors: true })
export class WebSocketGatewayService
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private logger: Logger = new Logger('WebSocketGateway');

  afterInit() {
    this.logger.log('WebSocket Gateway Initialized');
  }

  handleConnection(client: any) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  emitRowUpdate(cell: Cell) {
    const cellData = {
      value: cell.value,
      column: cell.column.name,
      row: cell.row.value,
      sheet: cell.sheet.name,
    };

    this.server.emit('rowUpdated', cellData);
  }
}
