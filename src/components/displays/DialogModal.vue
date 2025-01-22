<script lang="ts" setup>
const { id } = defineProps<{
  id: string
}>()
</script>

<template>
  <dialog :id="id" class="modal">
    <div class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-ghost absolute right-2 top-2">
          <i class="bx bx-x"></i>
        </button>
      </form>
      <slot></slot>
    </div>
  </dialog>
</template>
