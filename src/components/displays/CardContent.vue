<script lang="ts" setup>
import { defineProps } from 'vue'

const { title } = defineProps<{
  title?: string // Title of the card
}>()
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title flex justify-between">
        <h3>{{ title }}</h3>
        <div class="card-actions">
          <slot name="actions"></slot>
        </div>
      </div>
      <slot name="content"></slot>
    </div>
  </div>
</template>