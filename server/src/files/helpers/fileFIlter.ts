import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { CustomHttpException } from 'src/utils/Exceptions/CustomHttpException';

export const fileFilter = (opt?: FileFilterOptions): MulterOptions => {
  const maxSizeInMb = 1000 * 1000 * (opt?.maxSizeInMb || 2);

  return {
    fileFilter: (_req, file, cb) => {
      const isMimeValid = opt?.mimeType?.includes(file.mimetype);

      if (!isMimeValid) {
        cb(
          new CustomHttpException({
            code: 400,
            success: false,
            message: `Invalid filetype. Allowed files types are ${opt?.mimeType}`,
          }),
          true,
        );
      }

      cb(null, true);
    },
    limits: {
      fileSize: maxSizeInMb,
      files: 10,
    },
  };
};

interface FileFilterOptions {
  maxSizeInMb: number;
  mimeType: string[];
}
