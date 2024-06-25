import { registerDecorator, ValidationOptions } from 'class-validator';
import { isValid, parse } from 'date-fns';

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
          const date = parse(value, 'HH:mm', new Date());
          return isValid(date);
        },
        defaultMessage(/*args: ValidationArguments*/) {
          return `Invalid Time format! Time format should be HH:mm `;
        },
      },
    });
  };
}
