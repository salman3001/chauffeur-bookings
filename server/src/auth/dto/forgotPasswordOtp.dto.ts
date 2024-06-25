import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { ToLowercase } from 'src/utils/validators/ToLowercase';
import { Trim } from 'src/utils/validators/Trim';

export class forgotPasswordOtpDto {
  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @Trim()
  @ToLowercase()
  email: string;
}
