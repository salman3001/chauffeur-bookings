import { IsEmail, Length } from 'class-validator';

export class TestUser {
  @Length(2, 50)
  firstName: string;

  @Length(2, 50)
  lastName: string;

  @IsEmail()
  email: string;
}
