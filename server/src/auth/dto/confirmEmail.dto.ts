import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class confirmEmailDto {
  @ApiProperty()
  @IsJWT()
  jwt: string;
}
