import { HttpStatus } from '@nestjs/common';

export default function CustomRes(opt: {
  code: HttpStatus;
  success: boolean;
  message?: string;
  data?: any;
  errors?: Record<string, string[]>[];
}) {
  return opt;
}
