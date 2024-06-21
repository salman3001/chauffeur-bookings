import { plainToInstance } from 'class-transformer';
import { type ValidationError, validate } from 'class-validator';
import { Months } from './enums/Months';

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
): Record<string, string[]>[] {
  const errArray: Record<string, string[]>[] = [];

  if (errors.length > 0) {
    errors.forEach((err) => {
      errArray.push({
        [err.property]: err.constraints
          ? Object.values(err.constraints)
          : ['Validiation Failed'],
      });
    });
  }

  return errArray;
}

export async function validatePartialModel<T extends new () => T>(
  model: T,
  partialModel: Partial<T>,
): Promise<Record<string, string[]>[]> {
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
