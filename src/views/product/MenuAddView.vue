<template>
  <CardContent title="Add Menu">
    <template #content>
      <div class="grid lg:grid-cols-3 grid-cols-1">
        <div class="preview lg:block flex justify-center">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            :alt="imageUrl ? 'Image Preview' : 'Upload Image Placeholder'"
            class="artboard image-preview"
          />
          <div class="artboard image-placeholder" v-else>1:1</div>
        </div>
        <!-- File Input -->
        <div class="lg:col-span-2">
          <form class="grid grid-cols-1" @submit="handleSubmit">
            <InputFile
              type="file"
              @change="onFileChange"
              accept="image/jpeg, image/png image/jpg"
              label-text="Image"
              v-model="form.image"
              required
            />
            <InputField label-text="Menu Name" autofocus v-model="form.name" required />
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Category</span>
              </div>
              <select className="select select-bordered" v-model="form.category" required>
                <option disabled selected>Select</option>
                <option v-for="(item, index) in product.categories" :key="index" :value="item._id">
                  {{ item.name }}
                </option>
              </select>
            </label>
            <InputField type="number" label-text="Price" v-model.number="form.price" required />
            <InputField label-text="Description" v-model="form.description" required />
            <div class="text-end mt-6">
              <button type="submit" class="btn btn-outline">Add to Menu</button>
            </div>
          </form>
        </div>
      </div>
    </template>
  </CardContent>
</template>

<script lang="ts" setup>
import CardContent from '@/components/displays/CardContent.vue'
import InputField from '@/components/forms/inputs/InputField.vue'
import InputFile from '@/components/forms/inputs/InputFile.vue'

import { createMenu } from '@/services/menu'
import { useProductStore, type IMenu } from '@/stores/product'
import Swal from 'sweetalert2'
import { ref } from 'vue'

const imageUrl = ref<string | null>(null)
const product = useProductStore()
function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    menu_image.value = file
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        imageUrl.value = e.target.result
      }
    }
    reader.readAsDataURL(file)
  } else {
    imageUrl.value = null
  }
}
const menu_image = ref<File | null>(null)
const form = ref<Partial<IMenu>>({
  name: '',
  category: '',
  price: 0,
  description: '',
  image: '',
})

const handleSubmit = async (event: Event) => {
  event.preventDefault()

  const { success, message } = await createMenu(form.value as IMenu)
  if (success) {
    Swal.fire({
      title: 'Menu Added Successfully',
      text: message,
      icon: 'success',
      confirmButtonText: 'Okay',
    })
  } else {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
      confirmButtonText: 'Okay',
    })
  }
  form.value = {
    name: '',
    category: '',
    price: 0,
    description: '',
    image: '',
  }
  product.loadMenu()
}
</script>

<style scoped>
input[type='file'] {
  margin: 20px 0;
}

.preview img.image-preview {
  width: 100%;
  max-width: 320px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.preview .image-placeholder {
  width: 320px;
  height: 320px;
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
