import { registerDecorator, ValidationOptions } from 'class-validator';
import { DateTime } from 'luxon';

export function IsIsoAfter(
  specifiedDateTime: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'IsIsoAfter',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any /*,args: ValidationArguments*/) {
          if (typeof value !== 'string') {
            return false;
          }
          const date = DateTime.fromISO(value);
          const beforeDate = DateTime.fromISO(specifiedDateTime);

          const isValid = date.isValid && date >= beforeDate;

          return isValid;
        },
        defaultMessage(/*args: ValidationArguments*/) {
          return `Invalid date! Date should be after ${specifiedDateTime}`;
        },
      },
    });
  };
}
