import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalyticsService {
  async findAll() {
    return `This action returns all analytics`;
  }
}
