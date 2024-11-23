import { ApiProperty } from '@nestjs/swagger';

export class UpdateSheetDto {
  @ApiProperty()
  name: string;
}
