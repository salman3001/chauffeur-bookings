import { IsNotEmpty, IsString } from 'class-validator';

export default class Image {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsString()
  @IsNotEmpty()
  thumbnailUrl: string;
}
