import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class RegisterDto {
  @Length(2, 50)
  firstName: string;

  @Length(2, 50)
  lastName: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 50)
  password: string;

  @IsPhoneNumber('IN')
  phone?: string;
}
