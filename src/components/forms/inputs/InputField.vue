<script lang="ts" setup>
import { defineEmits } from 'vue'

// Define props for custom properties
const { labelText, modelValue, additionalLabel } = defineProps<{
  labelText: string // Label text
  modelValue?: unknown // v-model binding for input value
  additionalLabel?: string // Additional label to display
}>()

// Emit event to update v-model
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="form-control w-full">
    <div class="label">
      <span class="label-text">{{ labelText }}</span>
      <span v-if="additionalLabel" class="label-text-alt">{{ additionalLabel }}</span>
    </div>
    <input
      v-bind="$attrs"
      :value="modelValue"
      @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      class="input input-bordered w-full"
    />
  </label>
</template>
