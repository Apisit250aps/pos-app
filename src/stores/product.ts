import type { IPagination } from '@/libs/client'
import { getMenuCategories, getMenus } from '@/services/menu'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IMenu {
  _id: string
  name: string
  price: number
  category?: string | ICategory
  description?: string
  image: string | File
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
  const loadMenu = async function () {
    const { data, success, pagination: pg, message } = await getMenus({})
    menus.value = data!
    pagination.value = pg!
    if (!success) {
      console.error(message)
    }
  }
  const loadCategories = async function (): Promise<void> {
    const { data } = await getMenuCategories()
    categories.value = data!
  }
  const onInit = async function () {
    await Promise.all([loadMenu(), loadCategories()])
  }

  onInit()

  return {
    menus,
    categories,
    pagination,
    loadMenu,
    loadCategories,
  }
})
