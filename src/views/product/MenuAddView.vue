<template>
  <CardContent title="Add Menu">
    <template #content>
      <div class="grid grid-cols-1 gap-3">
        <div class="preview flex justify-center">
          <img
            v-if="imageUrl"
            :src="imageUrl"
            :alt="imageUrl ? 'Image Preview' : 'Upload Image Placeholder'"
            class="artboard artboard-horizontal phone-1 artboard-demo"
          />
          <div class="artboard artboard-horizontal artboard-demo phone-1" v-else>568 * 320</div>
        </div>
        <!-- File Input -->
        <div class="grid grid-cols-1 lg:col-span-2">
          <InputFile type="file" @change="onFileChange" accept="image/*" label-text="Image" />
          <InputField label-text="Menu Name" />
          <InputField label-text="Price" />
          <InputField label-text="Description" />
        </div>
      </div>
      
    </template>
  </CardContent>
</template>

<script lang="ts" setup>
import CardContent from '@/components/displays/CardContent.vue'
import InputField from '@/components/forms/inputs/InputField.vue'
import InputFile from '@/components/forms/inputs/InputFile.vue'
import { ref } from 'vue'

const imageUrl = ref<string | null>(null)

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    // Use FileReader to generate a data URL for preview
    const reader = new FileReader()
    reader.onload = (e) => {
      if (typeof e.target?.result === 'string') {
        imageUrl.value = e.target.result // Set image URL for preview
      }
    }
    reader.readAsDataURL(file)
  } else {
    imageUrl.value = null // Reset preview if no file is selected
  }
}
</script>

<style scoped>
input[type='file'] {
  margin: 20px 0;
}

.preview img {
  width: 568px;
  height: 320px;
  object-fit: cover;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.placeholder-image {
  opacity: 0.5;
  filter: grayscale(50%);
}
</style>
