import { IsEmail, IsNotEmpty } from 'class-validator';

export class forgotPasswordOtpDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
