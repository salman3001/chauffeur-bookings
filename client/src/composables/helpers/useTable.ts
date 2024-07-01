import type { ReadonlyHeaders } from '@/types/interfaces/Vuetify'
import { reactive } from 'vue'

export interface BaseTableQuery {
  page: number
  perPage: number
  sortBy: string
}

interface LoadItemProps {
  page: number
  itemsPerPage: number
  sortBy: string
}

export const useTable = (
  headers: ReadonlyHeaders,
  query: BaseTableQuery,
  getDateCb: () => void
) => {
  function loadItems({ page, itemsPerPage, sortBy }: LoadItemProps) {
    query.page = page
    query.perPage = itemsPerPage
    getDateCb()
  }

  return { headers, loadItems }
}
