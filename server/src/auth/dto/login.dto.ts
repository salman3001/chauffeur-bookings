import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ToLowercase } from 'src/utils/validators/ToLowercase';
import { Trim } from 'src/utils/validators/Trim';

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  @Trim()
  @ToLowercase()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
