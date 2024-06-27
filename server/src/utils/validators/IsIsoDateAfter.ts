import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export function IsIsoDateAfter(
  specifiedDate: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsIsoDateAfter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any /*,args: ValidationArguments*/) {
          if (typeof value !== 'string') {
            return false;
          }
          const date = DateTime.fromISO(value);

          return date.isValid && date >= DateTime.fromISO(specifiedDate);
        },
        defaultMessage(/*args: ValidationArguments*/) {
          return `Invalid date! Date should be after ${specifiedDate}`;
        },
      },
    });
  };
}
