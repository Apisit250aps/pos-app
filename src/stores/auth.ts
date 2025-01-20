import { fetchUser, userLogin } from '@/services/auth'
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

  const authentication = async () => {
    try {
      if (token.value) {
        const { data, success } = await fetchUser()
        if (success) {
          user.value = data!.auth
        }
      }
    } catch (error) {
      console.error(error)
      throw new Error('Server error: ' + error)
    }
  }
  authentication()
  const login = async ({
    username,
    password,
  }: Partial<IUser & { password: string }>): Promise<{ success: boolean; message: string }> => {
    try {
      const { data, success, message } = await userLogin({ username, password })
      if (!success) {
        return { message, success }
      }
      localStorage.setItem('auth_token', data!.token as string)
      token.value = data!.token
      return { message, success }
    } catch (error) {
      console.error(error)
      throw new Error('Server error: ' + error)
    }
  }
  return {
    token,
    isAuthenticated,
    user,
    auth,
    login,
    authentication,
  }
})
