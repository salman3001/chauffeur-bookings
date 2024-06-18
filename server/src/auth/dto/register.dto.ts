import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @Length(2, 50)
  firstName: string;

  @Length(2, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsPhoneNumber('IN')
  phone?: string;
}
