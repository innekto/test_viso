import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class WebhookDataDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  sheetName: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  row: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  column: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  newValue: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sheetId: number;
}
