import type { IPagination, IResponse, QueryString } from '@/libs/client'
import api from '@/libs/client'
import type { IInventory, IItemCategory } from '@/stores/inventory'
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
      return { success: false, message: error.response?.data.message }
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
      return { success: false, message: error.response?.data.message }
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
      return { success: false, message: error.response?.data.message }
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
      return { success: false, message: error.response?.data.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function addItemCategory(category:IItemCategory):Promise<IResponse<IItemCategory>>{
  try {
    const response = await api.post<IResponse<IItemCategory>>(`/inventory/category`, category)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function fetchItemCategory():Promise<IResponse<IItemCategory[]>>{
  try {
    const response = await api.get<IResponse<IItemCategory[]>>(`/inventory/category`)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function updateItemCategory(category:IItemCategory):Promise<IResponse<IItemCategory>>{
  try {
    const response = await api.put<IResponse<IItemCategory>>(`/inventory/category/${category._id}`, category)
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function deleteItemCategory(id:string):Promise<IResponse<void>>{
  try {
    await api.delete(`/inventory/category/${id}`)
    return { success: true, message: 'Category deleted successfully' }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.response?.data.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}