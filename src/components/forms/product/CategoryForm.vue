<template>
  <form @submit="handleSubmit">
    <InputField label-text="Name" placeholder="category name" v-model="form.name" />
    <InputField label-text="Description" placeholder="description" v-model="form.description" />
    <div class="mt-3 flex justify-end">
      <button type="submit" class="btn btn-outline min-w-56">
        <span :class="{ 'loading loading-spinner loading-sm': isLoading }">
          {{ data?._id ? 'Edit' : 'Add' }}
        </span>
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputField from '../inputs/InputField.vue'
import { useProductStore, type ICategory } from '@/stores/product'
import { createMenuCategory, updateMenuCategory } from '@/services/menu'
import Swal from 'sweetalert2'
import { closeModal } from '@/components'
//
const product = useProductStore()
const isLoading = ref<boolean>(false)
const form = ref<Partial<ICategory>>({
  name: '',
  description: '',
})
const { data } = defineProps<{
  data?: ICategory | null
}>()

watch(
  () => data,
  (newData) => {
    if (newData) {
      form.value = { ...newData }
    } else {
      form.value = { name: '', description: '' }
    }
  },
  { immediate: true },
)

const handleSubmit = async function (e: Event) {
  e.preventDefault()
  try {
    let response
    if (form.value._id) {
      response = await updateMenuCategory(form.value as ICategory)
      closeModal('category-edit')
    } else {
      response = await createMenuCategory(form.value as ICategory)
      closeModal('category-create')
    }
    if (response.success) {
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: form.value._id ? 'Category updated successfully!' : 'Category added successfully!',
      })
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to add category. Please try again.',
      })
    }
    form.value = {
      name: '',
      description: '',
    }
    product.loadCategories()
    isLoading.value = false
  } catch (error) {
    console.error(error)
    isLoading.value = false
  }
}
</script>

<style scoped></style>
