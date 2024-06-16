import { IsNotEmpty, IsString } from 'class-validator';

export default class Geometry {
  @IsString()
  @IsNotEmpty()
  x: string;

  @IsString()
  @IsNotEmpty()
  y: string;
}
