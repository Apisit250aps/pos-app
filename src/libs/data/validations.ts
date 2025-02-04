import { baseUrl } from '../client'

export const isZero = (value: number): boolean => {
  return value === 0
}

export const isEmpty = (value: string): boolean => {
  return value.trim() === ''
}

export const useImage = (image: string): string => {
  return `${baseUrl}/${image}`
}
