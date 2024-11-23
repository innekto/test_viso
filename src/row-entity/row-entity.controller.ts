import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { RowEntityService } from './row-entity.service';

import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('row')
@Controller('row')
export class RowEntityController {
  constructor(private readonly rowEntityService: RowEntityService) {}

  @Get()
  @ApiOperation({ summary: 'get rows' })
  async findAll() {
    return this.rowEntityService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'get row by id' })
  async findOne(@Param('id', new ParseIntPipe()) id: number) {
    return this.rowEntityService.findOne(id);
  }
}
