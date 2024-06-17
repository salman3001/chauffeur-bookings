import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsStrongPassword,
  Min,
} from 'class-validator';

export class resetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsNumber()
  @Min(6)
  otp: number;
}
