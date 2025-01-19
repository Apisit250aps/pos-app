import type { IResponse } from '@/libs/client'
import api from '@/libs/client'
import { AxiosError } from 'axios'
import { jwtDecode } from 'jwt-decode'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface IAuthState {
  token: string | null
  isAuthenticated: boolean
}

export interface IUser {
  userId: string
  username: string
  name: string
  nickName: string
  isAdmin: boolean
  isStaff: boolean
  isActive: boolean
  lastLogin: Date
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value as boolean)
  const auth = computed(() => {
    if (token.value) {
      return jwtDecode(token.value as string)
    }
    return null as IUser | null
  })
  const user = ref<IUser | null>(null)

  token.value = localStorage.getItem('auth_token') as string

  const fetchUser = async () => {
    try {
      const response = await api.get<IResponse<{ auth: IUser }>>('/auth')
      console.log(response)
      if (response.data.success) {
        user.value = response.data.data!.auth
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
  fetchUser()

  const register = async ({
    username,
    password,
  }: Partial<IUser & { password: string }>): Promise<IResponse> => {
    try {
      const response = await api.post('/auth/register', {
        username,
        password,
      })
      if (response.data.success) {
        localStorage.setItem('auth_token', response.data.data.token)
        token.value = response.data.data.token
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
  const login = async ({ username, password }: Partial<IUser & { password: string }>) => {
    try {
      const response = await api.post<IResponse<{ token: string }>>('/auth/login', {
        username,
        password,
      })
      if (response.data.success) {
        localStorage.setItem('auth_token', response.data.data!.token as string)
        token.value = response.data.data!.token
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
        message: 'An error occurred while logging in.',
      }
    }
  }
  return {
    token,
    isAuthenticated,
    user,
    auth,
    register,
    login,
  }
})
