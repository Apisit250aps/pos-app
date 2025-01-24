<template>
  <tr class="hover">
    <th>
      <label>
        <input type="checkbox" class="checkbox" @change="onChange(menu)" />
      </label>
    </th>
    <td>
      <div class="flex items-center gap-3">
        <div class="avatar">
          <div class="mask mask-squircle h-24 w-24">
            <img :src="useImage(menu.image)" />
          </div>
        </div>
        <div>
          <div class="font-bold">{{ menu.name }}</div>
        </div>
      </div>
    </td>
    <td>
      <span class="badge badge-ghost badge-sm">{{ menu.price }} ฿</span>
    </td>
    <td>{{ typeof menu.category === 'object' ? menu.category?.name : menu.category }}</td>
    <th>
      <button class="btn btn-ghost btn-xs">details</button>
    </th>
  </tr>
</template>

<script setup lang="ts">
import { baseUrl } from '@/libs/client'
import type { IMenu } from '@/stores/product'
const useImage = function (image: unknown): string {
  return `${baseUrl}/${image}`
}

const { menu, checked } = defineProps<{
  menu: IMenu
  checked?(menu: IMenu): void
}>()

const onChange = function (menu: IMenu): void {
  if (checked) checked(menu)
}
</script>

<style scoped></style>
