import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsStrongPassword } from 'class-validator';

export class resetPasswordDto {
  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsJWT()
  jwt: string;
}
