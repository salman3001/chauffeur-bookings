import { ApiPropertyOptional } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiPropertyOptional({ type: 'string', format: 'binary' })
  image: any;
}
