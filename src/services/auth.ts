import api, { baseUrl, type IResponse } from '@/libs/client'
import type { IUser } from '@/stores/auth'
import axios, { AxiosError } from 'axios'

export const fetchUser = async (): Promise<IResponse<{ auth: IUser }>> => {
  try {
    const response = await api.get<IResponse<{ auth: IUser }>>('/auth')
    if (response.data.success) {
      return response.data
    }
    return {
      success: false,
      message: 'Authentication failed',
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message,
      }
    }
    return {
      success: false,
      message: 'An error occurred while fetching user data.',
    }
  }
}

export const userRegister = async ({
  username,
  password,
}: Partial<IUser & { password: string }>): Promise<IResponse> => {
  try {
    const response = await axios.post(`${baseUrl}/auth/register`, {
      username,
      password,
    })
    if (response.data.success) {
      return response.data.token
    }
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message,
      }
    }
    return {
      success: false,
      message: 'An error occurred while registering.',
    }
  }
}

export const userLogin = async ({
  username,
  password,
}: Partial<IUser & { password: string }>): Promise<IResponse<{ token: string }>> => {
  try {
    const response = await axios.post<IResponse<{ token: string }>>(`${baseUrl}/auth/login`, {
      username,
      password,
    })
    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        success: false,
        message: error.response?.data.message,
      }
    }
    return {
      success: false,
      message: 'An error occurred while logging in.',
    }
  }
}
