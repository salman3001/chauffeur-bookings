import { IsEmail, IsNotEmpty, IsNumber, Length, Min } from 'class-validator';

export class resetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 50)
  password: string;

  @IsNumber()
  @Min(6)
  otp: number;
}
