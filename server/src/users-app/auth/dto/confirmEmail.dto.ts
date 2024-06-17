import { IsJWT } from 'class-validator';

export class confirmEmailDto {
  @IsJWT()
  jwt: string;
}
