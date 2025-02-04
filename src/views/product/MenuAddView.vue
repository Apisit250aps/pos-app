<template>
  <CardContent title="Add Menu">
    <template #content>
      <div class="grid lg:grid-cols-3 grid-cols-1 gap-4">
        <div class="preview lg:block flex justify-center">
          <img v-if="imageUrl" :src="imageUrl" alt="Image Preview" class="artboard image-preview" />
          <div v-else class="artboard image-placeholder">1:1</div>
        </div>
        <div class="lg:col-span-2">
          <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-4">
            <div class="grid grid-cols-1">
              <InputFile
                type="file"
                @change="onFileChange"
                accept="image/jpeg, image/png, image/jpg"
                label-text="Image"
                v-model="form.image"
                ref="fileInput"
                required
              />
            </div>
            <div class="grid grid-cols-2 gap-3">
              <InputField
                label-text="Menu Name"
                v-model="form.name"
                :value="form.name"
                required
                autofocus
              />
              <div class="form-control w-full">
                <label class="label">
                  <span class="label-text">Category</span>
                </label>
                <select class="select select-bordered" v-model="form.category" required>
                  <option disabled value="">Select</option>
                  <option v-for="category in categories" :key="category._id" :value="category._id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              <InputField
                type="number"
                label-text="Price"
                v-model.number="form.price"
                min="0"
                required
              />
              <InputField label-text="Description" v-model="form.description" />
            </div>
          </form>
        </div>
      </div>
    </template>
  </CardContent>
  <CardContent title="Recipe">
    <template #content>
      <div class="grid grid-cols-2 gap-3">
        <div class="overflow-x-auto">
          <table class="table">
            <!-- head -->
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Job</th>
                <th>Favorite Color</th>
              </tr>
            </thead>
            <tbody>
              <!-- row 1 -->
              <tr v-for="(item, index) in selectedInventory" :key="index">
                <th>{{ index + 1 }}</th>
                <td>{{ item.itemName }}</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
            </tbody>
          </table>
        </div>
        <InventorySelection v-model="selectedInventory" />
      </div>
    </template>
  </CardContent>
</template>

<script setup lang="ts">
import { ref, type InputHTMLAttributes } from 'vue'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
//
import InventorySelection from '@/components/displays/products/form/InventorySelection.vue'
import CardContent from '@/components/displays/CardContent.vue'
import InputField from '@/components/forms/inputs/InputField.vue'
import InputFile from '@/components/forms/inputs/InputFile.vue'

import { useProductStore } from '@/stores/product'
import type { IMenu } from '@/stores/product'
import type { IInventory } from '@/stores/inventory'

// Store setup
const product = useProductStore()
const { addMenus } = product
const { categories } = storeToRefs(product)
const fileInput = ref<InputHTMLAttributes>()
// Store inventory

const selectedInventory = ref<IInventory[]>([])
// Reactive state
const imageUrl = ref<string | null>(null)
const menu_image = ref<File | null>(null)
const form = ref<Partial<IMenu>>({
  name: '',
  category: '',
  price: 0,
  description: '',
  image: '',
})

// File change handler
const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (file) {
    menu_image.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      imageUrl.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  } else {
    imageUrl.value = null
    menu_image.value = null
  }
}

// Submit handler
const handleSubmit = async () => {
  form.value.image = menu_image.value as File

  try {
    const { success, message } = await addMenus(form.value as IMenu)

    Swal.fire({
      title: success ? 'Menu Added Successfully' : 'Error',
      text: message,
      icon: success ? 'success' : 'error',
      confirmButtonText: 'Okay',
    })

    if (success) {
      // Reset form
      imageUrl.value = null
      menu_image.value = null
      form.value = {
        name: '',
        category: '',
        price: 0,
        description: '',
        image: '',
      }
    }
  } catch (error) {
    console.error(error)
    Swal.fire({
      title: 'Error',
      text: 'An unexpected error occurred',
      icon: 'error',
      confirmButtonText: 'Okay',
    })
  }
}
</script>

<style scoped>
.image-preview {
  width: 100%;
  max-width: 275px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.image-placeholder {
  width: 275px;
  height: 275px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  color: #888;
}
</style>
