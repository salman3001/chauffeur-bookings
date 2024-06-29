export interface ResType<T> {
  code: number
  success: boolean
  message?: string
  data?: T
  errors?: ValidationErrorObj
}

export interface Paginated<T> {
  count: number
  results: T
  perPage: number
}

type ValidationError = {
  errors: string[]
}

export type ValidationErrorObj =
  | (ValidationError & {
      [key: string]: ValidationErrorObj
    })
  | null
