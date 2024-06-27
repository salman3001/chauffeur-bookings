import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export function IsIsoDate(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsIsoDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any /*,args: ValidationArguments*/) {
          if (typeof value !== 'string') {
            return false;
          }
          const date = DateTime.fromISO(value);
          return date.isValid;
        },
        defaultMessage(/*args: ValidationArguments*/) {
          return `Invalid date! Date format should be yyyy-MM-dd`;
        },
      },
    });
  };
}
