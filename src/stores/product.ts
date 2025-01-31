import type { IPagination } from '@/libs/client'
import {
  fetchMenus,
  createMenu,
  updateMenu,
  deleteMenu,
  fetchMenuCategories,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from '@/services/menu'
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

  const getMenus = async function () {
    try {
      const { data, pagination: pg, success, message } = await fetchMenus({})
      menus.value = data!
      pagination.value = pg!
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const addMenus = async function (menu: IMenu) {
    try {
      const { data, success, message } = await createMenu(menu)
      menus.value.push(data!)
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const editMenus = async function (menu: IMenu) {
    try {
      const { success, message } = await updateMenu(menu)
      menus.value = menus.value.map((m) => (m._id === menu._id ? menu : m))
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const removeMenus = async function (id: string) {
    try {
      const { success, message } = await deleteMenu(id)
      const index = menus.value.findIndex((inv) => inv._id === id)
      if (index !== -1) {
        menus.value.splice(index, 1)
      }
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const getCategories = async function () {
    try {
      const { data, success, message } = await fetchMenuCategories()
      categories.value = data!
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const addCategories = async function (category: ICategory) {
    try {
      const { data, success, message } = await createMenuCategory(category)
      categories.value.push(data!)
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const editCategories = async function (category: ICategory) {
    try {
      const { success, message } = await updateMenuCategory(category)
      categories.value = categories.value.map((c) => (c._id === category._id ? category : c))
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const removeCategories = async function (id: string) {
    try {
      const { success, message } = await deleteMenuCategory(id)
      const index = categories.value.findIndex((cat) => cat._id === id)
      if (index !== -1) {
        categories.value.splice(index, 1)
      }
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const onInit = async function () {
    await Promise.all([fetchMenuCategories(), getMenus()])
  }

  onInit()

  return {
    // state
    menus,
    categories,
    pagination,
    // menu
    getMenus,
    addMenus,
    editMenus,
    removeMenus,
    // category
    getCategories,
    addCategories,
    editCategories,
    removeCategories,
  }
})
