export interface ResType<T> {
  code: number
  success: boolean
  message?: string
  data?: T
  errors?: ValidationErrorObj
}

type ValidationError = {
  errors: string[]
}

export type ValidationErrorObj =
  | (ValidationError & {
      [key: string]: ValidationErrorObj
    })
  | null
