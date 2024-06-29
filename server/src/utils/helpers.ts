import { plainToInstance } from 'class-transformer';
import { type ValidationError, validate } from 'class-validator';
import { ValidationErrorObj } from './types/common';

type EnumLike = Array<unknown> | Record<string, unknown>;

export function getEnumValues<T extends EnumLike>(enumType: T): Array<string> {
  return [
    ...new Set(
      Object.entries(enumType)
        .filter(([key]) => !~~key)
        .flatMap((item) => item),
    ),
  ] as Array<string>;
}

export function generateClassValidatorErrors(
  errors: ValidationError[],
): ValidationErrorObj {
  let errObj: ValidationErrorObj = null;

  if (errors.length > 0) {
    errors.forEach((err) => {
      if (err?.constraints) {
        if (errObj === null) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          errObj = {};
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        errObj[err.property] = {
          errors: err?.constraints
            ? Object.values(err.constraints)
            : ['Validiation Failed'],
        };
      }

      if (err?.children) {
        const childErrors = generateClassValidatorErrors(err.children);
        if (errObj === null) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          errObj = {};
        }

        if (childErrors) {
          const newErrorObj = {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            ...errObj[err.property],
            ...childErrors,
          };
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          errObj[err.property] = newErrorObj;
        }
      }
    });
  }

  return errObj;
}

export async function validatePartialModel<T extends new () => T>(
  model: T,
  partialModel: Partial<T>,
): Promise<ValidationErrorObj> {
  const partialModelInstance = plainToInstance(model, partialModel);
  const errors = await validate(partialModelInstance);
  return generateClassValidatorErrors(errors);
}

export function stringifyPoint(opt?: { x: string; y: string }) {
  if (!opt) {
    return null;
  }
  return `POINT(${opt.x} ${opt.y})`;
}

export function parsePointString(point: string) {
  if (point != null) {
    const match = point.match(/POINT\(([^ ]+) ([^ ]+)\)/);
    if (match && match.length === 3) {
      const x = parseFloat(match[1]);
      const y = parseFloat(match[2]);

      return { x, y };
    } else {
      throw new Error('Invalid point string format');
    }
  } else {
    return null;
  }
}

export const generateOtp = () => Math.floor(100000 + Math.random() * 900000);

export const weekDays = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];
