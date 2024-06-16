import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { EntityNotFoundError, TypeORMError } from 'typeorm';
import { CustomHttpException } from './CustomHttpException';
import { NestPolicyError } from '@salman3001/nest-policy-module';

@Catch()
export class GlobalHttpExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.message;

      if (exception instanceof CustomHttpException) {
        response.status(status).json({
          success: false,
          message: message,
          data: null,
          code: status,
          errors: exception.errors,
        });
      } else {
        response.status(status).json({
          success: false,
          message: message,
          data: null,
          code: status,
        });
      }
    } else if (exception instanceof TypeORMError) {
      if (exception instanceof EntityNotFoundError) {
        response.status(HttpStatus.NOT_FOUND).json({
          success: false,
          message: 'Not Found',
          data: null,
          code: 404,
        });
      } else {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          success: false,
          message: exception?.message || 'Server error',
          data: null,
          code: 500,
        });
      }
    } else if (exception instanceof NestPolicyError) {
      response.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Unauthorized',
        data: null,
        code: HttpStatus.UNAUTHORIZED,
      });
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: (exception as any).message,
        data: null,
        code: 500,
      });
    }
  }
}
