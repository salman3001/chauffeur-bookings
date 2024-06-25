import {
  ArgumentMetadata,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { CustomHttpException } from '../Exceptions/CustomHttpException';
import { generateClassValidatorErrors } from '../helpers';

@Injectable()
export default class ValidatorPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);

    const errors = await validate(object, { whitelist: true });
    if (errors.length > 0) {
      throw new CustomHttpException({
        code: HttpStatus.UNPROCESSABLE_ENTITY,
        message: 'Validation failed',
        success: false,
        errors: generateClassValidatorErrors(errors),
      });
    }
    return object;
  }

  private toValidate(metatype: object): boolean {
    const types: object[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
