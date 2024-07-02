import type { ReadonlyHeaders } from '@/types/interfaces/Vuetify'
import { reactive, type Ref } from 'vue'

export interface BaseTableQuery {
  page: number
  perPage: number
  orderBy: string[]
  search: string
}

interface LoadItemProps {
  page: number
  itemsPerPage: number
  sortBy: {
    key: string
    order: 'asc' | 'desc'
  }[]
  search: string
}

export const useTable = (
  headers: ReadonlyHeaders,
  query: BaseTableQuery,
  getDateCb: () => void
) => {
  function loadItems(opt: LoadItemProps) {
    const { page, itemsPerPage, sortBy, search } = opt

    query.page = page
    query.perPage = itemsPerPage
    query.search = search

    if (sortBy && sortBy.length > 0) {
      sortBy.forEach((v) => {
        query.orderBy = [`${v?.key}:${v?.order?.toUpperCase()}`]
      })
    }

    getDateCb()
  }

  return { headers, loadItems }
}
