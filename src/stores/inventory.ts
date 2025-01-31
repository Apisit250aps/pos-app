import { fetchInventory, fetchItemCategory } from '@/services/inventory'
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

  const loadInventory = async () => {
    try {
      const { data } = await fetchInventory({ limit: 10, page: 1 })
      inventories.value = data!
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const loadCategories = async () => {
    try {
      const { data } = await fetchItemCategory()
      categories.value = data!
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  const setInventory = async () => {
    try {
      await Promise.all([loadInventory(), loadCategories()])
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
  }
})
