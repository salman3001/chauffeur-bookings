import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export function IsTimeString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsTimeString',
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
          return `Invalid Time format! Time format should be HH:mm `;
        },
      },
    });
  };
}
