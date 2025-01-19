import axios, { Axios } from 'axios'

export interface IResponse<T = unknown> {
  success: boolean
  message: string
  data?: T // Replace with the actual response type
}

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your API's base URL
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
})

// Add a request interceptor to include the token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    // Handle request error
    return Promise.reject(error)
  },
)

// Add a response interceptor to handle token expiration
api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token has expired or is invalid
      console.warn('Token has expired. Logging out...')
      localStorage.removeItem('token') // Clear token from localStorage
      window.location.href = '/login' // Redirect to login page
    }
    return Promise.reject(error) // Pass other errors to the caller
  },
)

export default api as Axios
