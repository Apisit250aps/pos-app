<script lang="ts" setup>
import { defineProps, type VNode } from 'vue'

const { title, actions } = defineProps<{
  title: string // Title of the card
  actions?: VNode[] // Optional actions for the card
}>()
</script>

<template>
  <div class="card">
    <div class="card-body">
      <div class="card-title flex justify-between">
        <h3>{{ title }}</h3>
        <div class="card-actions">
          <template v-if="actions">
            <slot name="actions" v-for="action in actions" :key="action.key">{{ action }}</slot>
          </template>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>
