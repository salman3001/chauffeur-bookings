import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { CustomHttpException } from '../Exceptions/CustomHttpException';

@Injectable()
export class FileValidatorPipe implements PipeTransform {
  opt: FileValidatorPipeOptions;

  constructor(opt: FileValidatorPipeOptions) {
    this.opt = opt;
  }
  transform(value: Express.Multer.File, {}: ArgumentMetadata) {
    const isSizeValid = value.size < 1000 * 1000 * this.opt.maxSizeInMb;
    const isMimeValid = this.opt.mimeType.includes(value.mimetype);
    if (!isSizeValid) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: `File size should be less than ${this.opt.maxSizeInMb}mb`,
      });
    }

    if (!isMimeValid) {
      throw new CustomHttpException({
        code: 400,
        success: false,
        message: `Invalid filetype. Allowed files types are ${this.opt.mimeType}`,
      });
    }

    return value;
  }
}

interface FileValidatorPipeOptions {
  maxSizeInMb: number;
  mimeType: string[];
}
