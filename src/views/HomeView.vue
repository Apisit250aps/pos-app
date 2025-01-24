<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { useImage } from '@/libs/data/validations'
import CardContent from '@/components/displays/CardContent.vue'
const product = useProductStore()
</script>

<template>
  <CardContent>
    <template #content>
      <div class="grid grid-cols-4 gap-4">
        <div class="card bg-base-100 shadow-lg" v-for="(menu, index) in product.menus" :key="index">
          <figure>
            <img :src="useImage(menu.image as string)" :alt="menu.name" class="menu-image" />
          </figure>
          <div class="p-3">
            <h2 class="card-title">{{ menu.name }}</h2>
            <p>{{ menu.price }} ฿</p>
            <div class="card-actions justify-end">
              <button class="btn btn-primary">Sell</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </CardContent>
</template>

<style scoped>
.menu-image {
  aspect-ratio: 1/1;
}
</style>
