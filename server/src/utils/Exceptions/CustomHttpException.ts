import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorObj } from '../types/common';

export class CustomHttpException extends HttpException {
  errors: ValidationErrorObj | undefined;
  constructor(opt: {
    code: HttpStatus;
    success: boolean;
    message?: string;
    data?: any;
    errors?: ValidationErrorObj;
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
