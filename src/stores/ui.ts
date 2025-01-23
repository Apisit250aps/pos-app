import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const dark = localStorage.getItem('theme')
  const theme = ref<boolean>(dark === 'dark')
  watch(
    () => theme.value,
    (newTheme: boolean) => {
      if (newTheme) {
        localStorage.setItem('theme', 'dark')
      } else {
        localStorage.setItem('theme', 'light')
      }
    },
  )
  return {
    theme,
  }
})
