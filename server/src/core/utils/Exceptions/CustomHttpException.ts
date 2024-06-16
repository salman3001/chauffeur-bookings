import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomHttpException extends HttpException {
  errors: Record<string, string[]>[] | undefined;
  constructor(opt: {
    code: HttpStatus;
    success: boolean;
    message?: string;
    data?: any;
    errors?: Record<string, string[]>[];
  }) {
    super(
      {
        success: opt.success,
        message: opt?.message,
        data: opt?.data,
        error: opt?.errors,
      },
      opt.code,
    );
    this.errors = opt?.errors;
  }
}
