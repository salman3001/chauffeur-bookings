import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export default class Geometry {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  x: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  y: string;
}
