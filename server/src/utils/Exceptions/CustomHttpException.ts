import { HttpException, HttpStatus } from '@nestjs/common';
import { ValidationErrorsArray } from '../types/common';

export class CustomHttpException extends HttpException {
  errors: ValidationErrorsArray | undefined;
  constructor(opt: {
    code: HttpStatus;
    success: boolean;
    message?: string;
    data?: any;
    errors?: ValidationErrorsArray;
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
