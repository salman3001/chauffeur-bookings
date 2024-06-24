import { registerDecorator, ValidationOptions } from 'class-validator';
import { isAfter, isValid, parse } from 'date-fns';

export function IsIsoAfter(
  specifiedDate: Date,
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
          const date = parse(value, 'yyyy-MM-dd', new Date());
          return isValid(date) && isAfter(date, specifiedDate);
        },
        defaultMessage(/*args: ValidationArguments*/) {
          return `Invalid date! Date should be after ${specifiedDate.toISOString()}`;
        },
      },
    });
  };
}
