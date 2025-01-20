import type { IPagination, IResponse, QueryString } from '@/libs/client'
import api from '@/libs/client'
import type { IInventory } from '@/stores/inventory'
import { AxiosError } from 'axios'

export const fetchInventory = async ({
  limit,
  page,
}: QueryString): Promise<IResponse<IInventory[]> & { pagination?: IPagination }> => {
  try {
    const response = await api.get<IResponse<IInventory[]> & { pagination?: IPagination }>(
      `/inventory`,
      { params: { limit, page } },
    )
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export const createInventory = async (
  inventories: IInventory[],
): Promise<IResponse<IInventory[]>> => {
  try {
    const response = await api.post<IResponse<IInventory[]>>(`/inventory`, inventories)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export const updateInventory = async (inventory: IInventory): Promise<IResponse<IInventory>> => {
  try {
    const response = await api.put<IResponse<IInventory>>(`/inventory/${inventory._id}`, inventory)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export const deleteInventory = async (id: string): Promise<IResponse<void>> => {
  try {
    await api.delete(`/inventory/${id}`)
    return { success: true, message: 'Inventory deleted successfully' }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}
