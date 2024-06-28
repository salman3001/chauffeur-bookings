export interface ResType<T> {
  code: number
  success: boolean
  message?: string
  data?: T
  errors?: ValidationErrorsArray
}

export type ValidationErrorObj = {
  [key: string]: string[] | ValidationErrorObj
}

export type ValidationErrorsArray = ValidationErrorObj[]
