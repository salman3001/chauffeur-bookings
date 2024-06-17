import { IsEmail, IsJWT, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class resetPasswordDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsJWT()
  jwt: string;
}
