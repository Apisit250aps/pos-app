import api, { type IPagination, type IResponse } from '@/libs/client'
import type { ICategory, IMenu } from '@/stores/product'
import { AxiosError } from 'axios'

export async function createMenu(menu: IMenu): Promise<IResponse<IMenu>> {
  try {
    const response = await api.post<IResponse<IMenu>>('/menu', menu)
    const { success, message, data } = response.data
    return { success, message, data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function getMenus({
  page,
  limit,
}: {
  limit?: number
  page?: number
}): Promise<IResponse<IMenu[]> & { pagination?: IPagination }> {
  try {
    const response = await api.get<IResponse<IMenu[]> & { pagination?: IPagination }>('/menu', {
      params: {
        page,
        limit,
      },
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function updateMenu(menu: IMenu): Promise<IResponse<IMenu>> {
  try {
    const response = await api.put<IResponse<IMenu>>(`/menu/${menu._id}`, menu)
    const { success, message, data } = response.data
    return { success, message, data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function deleteMenu(id: string): Promise<IResponse<void>> {
  try {
    await api.delete(`/menu/${id}`)
    return { success: true, message: 'Menu deleted successfully' }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function createMenuCategory(category: ICategory): Promise<IResponse<ICategory>> {
  try {
    const response = await api.post<IResponse<ICategory>>('/menu/category', category)
    const { success, message, data } = response.data
    return { success, message, data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function getMenuCategories(): Promise<IResponse<ICategory[]>> {
  try {
    const response = await api.get<IResponse<ICategory[]>>('/menu/category')
    const { success, message, data } = response.data
    return { success, message, data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function updateMenuCategory(category: ICategory): Promise<IResponse<ICategory>> {
  try {
    const response = await api.put<IResponse<ICategory>>(`/menu/category/${category._id}`, category)
    const { success, message, data } = response.data
    return { success, message, data }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}

export async function deleteMenuCategory(id: string): Promise<IResponse<void>> {
  try {
    await api.delete(`/menu/category/${id}`)
    return { success: true, message: 'Menu category deleted successfully' }
  } catch (error) {
    if (error instanceof AxiosError) {
      return { success: false, message: error.message }
    }
    return { success: false, message: 'An error occurred' }
  }
}
