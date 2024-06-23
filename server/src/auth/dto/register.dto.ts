import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @ApiProperty()
  @Length(2, 50)
  firstName: string;

  @ApiProperty()
  @Length(2, 50)
  lastName: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsPhoneNumber('IN')
  phone?: string;
}
