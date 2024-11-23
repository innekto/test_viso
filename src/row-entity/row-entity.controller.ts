import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RowEntityService } from './row-entity.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RawResponse, RawsResponse } from 'src/interface/response.interface';

@ApiTags('row')
@Controller('row')
export class RowEntityController {
  constructor(private readonly rowEntityService: RowEntityService) {}

  @Get()
  @ApiOperation({ summary: 'get rows' })
  async findAll(): Promise<RawsResponse> {
    return this.rowEntityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get row by id' })
  async findOne(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<RawResponse> {
    return this.rowEntityService.findOne(id);
  }
}
