import type { IPagination } from '@/libs/client'
import { getMenuCategories } from '@/services/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IMenu {
  _id: string
  name: string
  price: number
  category?: string
  description?: string
  image?: string
  status: boolean
}

export interface ICategory {
  _id: string
  name: string
  description?: string
  status: boolean
  menuCount?: number
}

export const useProductStore = defineStore('products', () => {
  const menus = ref<IMenu[]>([])
  const categories = ref<ICategory[]>([])
  const pagination = ref<IPagination>({
    page: 1,
    limit: 10,
    totalPages: 0,
    totalDocs: 0,
  })

  const loadMenu = function ({ data, pagination: pg }: { data: IMenu[]; pagination: IPagination }) {
    menus.value = data
    pagination.value = pg
  }

  const loadCategories = async function (): Promise<void> {
    const { data } = await getMenuCategories()
    categories.value = data!
  }

  loadCategories()

  return {
    menus,
    categories,
    pagination,
    loadMenu,
    loadCategories,
  }
})
