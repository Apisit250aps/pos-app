<template>
  <form @submit.prevent="submitForm">
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
import { closeModal } from '@/components'
import InputField from '@/components/forms/inputs/InputField.vue'
import { useInventoryStore, type IItemCategory } from '@/stores/inventory'
import Swal from 'sweetalert2'
import { reactive, ref, watch } from 'vue'
const inventory = useInventoryStore()
const { addCategory, editCategory } = inventory
const isLoading = ref(false)
const form = reactive<{
  _id: string | undefined
  name: string
  description: string
}>({
  _id: undefined,
  name: '',
  description: '',
})
const { data } = defineProps<{
  data?: Partial<IItemCategory> | null
}>()

watch(
  () => data,
  (newData) => {
    if (newData) {
      form._id = newData._id
      form.name = newData.name!
      form.description = newData.description!
    } else {
      form._id = undefined
      form.name = ''
      form.description = ''
    }
  },
  { immediate: true },
)

const submitForm = async (e: Event) => {
  try {
    e.preventDefault()
    isLoading.value = true
    if (form._id) {
      // edit
      const { success, message } = await editCategory(form as IItemCategory)
      closeModal('item-category-edit')
      Swal.fire({
        icon: success ? 'success' : 'error',
        title: success ? 'Success' : 'Failed',
        text: message,
      })
    } else {
      const { success, message } = await addCategory(form as IItemCategory)
      closeModal('item-category-create')
      Swal.fire({
        icon: success ? 'success' : 'error',
        title: success ? 'Success' : 'Failed',
        text: message,
      })
    }
    form._id = undefined
    form.name = ''
    form.description = ''
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped></style>
