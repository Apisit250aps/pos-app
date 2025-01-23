import { fetchInventory } from '@/services/inventory';
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IInventory extends Document {
  _id: string
  itemName: string
  cost: number
  itemQuantity: number
  quantity: number
  unit: string
  stock: number
  stockUnit: string
  minStock: number
}

export const useInventoryStore = defineStore('inventory', () => {
  const inventories = ref<IInventory[]>([])

  const setInventory = async () => {
    try {
      const { data } = await fetchInventory({})
      inventories.value = data!
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  setInventory()

  return {
    inventories,
    setInventory
  }
})
