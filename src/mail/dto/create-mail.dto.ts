import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateMailDto {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;
}
