import {
  addItemCategory,
  createInventory,
  deleteInventory,
  deleteItemCategory,
  fetchInventory,
  fetchItemCategory,
  updateItemCategory,
} from '@/services/inventory'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IInventory {
  _id: string
  itemName: string
  category: IItemCategory | string
  cost: number
  itemQuantity: number
  quantity: number
  unit: string
  stock: number
  stockUnit: string
  minStock: number
  createdAt: Date
  updatedAt: Date
}

export interface IItemCategory {
  _id: string
  name: string
  description?: string
  status: boolean
  createdAt: Date
  updatedAt: Date
}

export const useInventoryStore = defineStore('inventory', () => {
  const inventories = ref<IInventory[]>([])
  const categories = ref<IItemCategory[]>([])

  const getInventory = async () => {
    try {
      const { data, success, message } = await fetchInventory({ limit: 10, page: 1 })
      inventories.value = data!
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const addInventory = async (item: IInventory[]) => {
    try {
      const { data, success, message } = await createInventory(item)
      inventories.value.push(...data!)
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const editInventory = async (item: IInventory) => {
    try {
      const { success, message } = await deleteInventory(item._id)
      inventories.value = inventories.value.map((inv) => (inv._id === item._id ? item : inv))
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const removeInventory = async (id: string) => {
    try {
      const { success, message } = await deleteInventory(id)
      const index = inventories.value.findIndex((inv) => inv._id === id)
      if (index !== -1) {
        inventories.value.splice(index, 1)
      }
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const getCategories = async () => {
    try {
      const { data, success, message } = await fetchItemCategory()
      categories.value = data!
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const addCategory = async (category: IItemCategory) => {
    try {
      const { data, success, message } = await addItemCategory(category)
      categories.value.push(data!)
      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }
  const removeCategory = async (id: string) => {
    try {
      const { success, message } = await deleteItemCategory(id)
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
  const editCategory = async (category: IItemCategory) => {
    try {
      const { success, message } = await updateItemCategory(category)

      categories.value = categories.value.map((item) =>
        item._id === category._id ? category : item,
      )

      return { success, message }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const setInventory = async () => {
    try {
      await Promise.all([getInventory(), getCategories()])
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  setInventory()

  return {
    inventories,
    categories,
    setInventory,
    // category
    getCategories,
    addCategory,
    removeCategory,
    editCategory,
    // inventory
    getInventory,
    addInventory,
    removeInventory,
    editInventory,
  }
})
